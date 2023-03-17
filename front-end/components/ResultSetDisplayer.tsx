import { Dispatch, SetStateAction } from 'react'
import ReactMarkdown from 'react-markdown'
import useSWR, { Fetcher } from 'swr'

import { highlightOccurringWords } from '../utils'
import ResultsLoadingSkeleton from './ResultsLoadingSkeleton'

type ResultSetDisplayerProps = {
    fetchQuery: string,
}

type Results = {
    docId: Number,
    url: string,
    title: string,
    excerpt: string
}[]


const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
// const API_URL = 'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/documents'
// const API_URL = 'http://localhost:5000/query'

export default function ResultSetDisplayer({ fetchQuery }: ResultSetDisplayerProps) {
    const { data, error, isLoading } = useSWR(fetchQuery, fetcher);

    if (error) return <div>We don&apos;t support this kind of query.</div>
    // if (error) return <div>failed to load: ({JSON.stringify(error)})</div>
    if (isLoading) return <ResultsLoadingSkeleton />
    if (data!.length > 0) {
        return (
            <>
                {data!.map((item, index) => {
                    let chapterNum = item.url.slice(item.url.indexOf('/chapters/') + 10)
                    // console.log(item.excerpt)
                    console.log(fetchQuery)
                    return <div key={index}>
                        <a href={item.url} className='group'>
                            {/* <em>docId: {item.docId.toString()}</em> */}
                            <br />
                            <cite className='text-gray-500 text-sm not-italic'>{item.url}</cite>
                            <h3 className='text-blue-600 text-xl group-hover:underline'>
                                {item.title}
                            </h3>
                            <ReactMarkdown className='text-sm text-gray-800'>
                                {highlightOccurringWords(item.excerpt, decodeURIComponent(fetchQuery))}
                            </ReactMarkdown>
                            {
                                chapterNum != '1'
                                    ? <div className='text-sm text-red-500'>Navigate to chapter {chapterNum}</div>
                                    : <></>
                            }
                        </a>
                    </div>
                }
                )}
            </>
        )
    } else {
        return (
            <></>
        )
    }
}