import { Dispatch, SetStateAction } from 'react'
import useSWR, { Fetcher } from 'swr'

type ResultSetDisplayerProps = {
    query: string | string[],
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
                            <p className='text-sm text-gray-800'>{item.excerpt}</p>
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