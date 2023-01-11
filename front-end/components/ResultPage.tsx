import { Dispatch, SetStateAction } from 'react'
import useSWR, { Fetcher } from 'swr'

type ResultPageProps = {
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

export default function ResultPage({ query, pageIndex, setFinished }: ResultPageProps) {
    const { data, error, isLoading } = useSWR(`${API_URL}?query=${query}&p=${pageIndex}&l=15`, fetcher);

    if (error) return <div>failed to load: ({error})</div>
    if (isLoading) return <div>loading...</div>
    if (data!.length > 0) {
        return (
            <>
                {data!.map(item =>
                    <div key={item.docId.toString()}>
                        <em>docId: {item.docId.toString()}</em>
                        <br />
                        <cite>{item.url}</cite>
                        <h3>
                            <a href={item.url} className='text-blue-600 hover:text-blue-400'>
                                {item.title}
                            </a>
                        </h3>
                        <p>{item.excerpt}</p>
                        <hr />
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