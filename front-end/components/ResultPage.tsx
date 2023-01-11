import useSWR, { Fetcher } from 'swr'

type ResultPageProps = {
    query: String,
    pageIndex: Number
}

type Results = {
    docId: Number,
    link: URL,
    title: String,
    excerpt: String
}[]


const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

const API_URL = 'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/documents'

export default function ResultPage({ query, pageIndex }: ResultPageProps) {
    // TODO: use query in url once real endpoint available
    // TODO: Check what happens if N not div by 15
    const { data, error, isLoading } = useSWR(`${API_URL}?p=${pageIndex}&l=15`, fetcher);

    if (error) return <div>failed to load: ({error})</div>
    if (isLoading) return <div>loading...</div>
    if (data) {
        return <div>{data.map(item => <div key={item.docId.toString()}>{item.title}</div>)}</div>
    } else {
        return <div>No more results</div>
    }
}