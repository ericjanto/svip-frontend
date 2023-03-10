import { Dispatch, SetStateAction } from 'react'
import ReactMarkdown from 'react-markdown'
import useSWR, { Fetcher } from 'swr'

import { highlightOccurringWords } from '../utils'

type ResultSetDisplayerProps = {
    query: string,
    pageIndex: Number,
    setFinished: Dispatch<SetStateAction<boolean>>,
}

type Results = {
    docId: Number,
    url: string,
    title: string,
    excerpt: string
}[]


const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
const API_URL = 'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/documents'

export default function ResultSetDisplayer({ query, pageIndex, setFinished }: ResultSetDisplayerProps) {
    const { data, error, isLoading } = useSWR(`${API_URL}?query=${query}&p=${pageIndex}&l=15`, fetcher);

    if (error) return <div>failed to load: ({error})</div>
    if (isLoading) return <div>loading...</div>
    if (data!.length > 0) {
        return (
            <>
                {data!.map(item =>
                    <div key={item.docId.toString()}>
                        <a href={item.url} className='group'>
                            {/* <em>docId: {item.docId.toString()}</em> */}
                            <br />
                            <cite className='text-gray-500 text-sm not-italic'>{item.url}</cite>
                            <h3 className='text-blue-600 text-xl group-hover:underline'>
                                {item.title}
                            </h3>
                            <ReactMarkdown className='text-sm text-gray-800'>
                                {highlightOccurringWords(item.excerpt, query)}
                            </ReactMarkdown>
                        </a>
                    </div>
                )}
            </>
        )
    } else {
        setFinished(true)
        return (
            <></>
        )
    }
}