import useSWR, { Fetcher } from 'swr'

type SearcherProps = {
    query: String
}

type SearchHit = {
    docId: Number,
    link: URL,
    title: String,
    excerpt: String
}

type Results = {
    nextPage: URL | null,
    sortedResults: SearchHit[]
}

const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export default function Searcher({ query }: SearcherProps) {
    // TODO: change API endpoint once it's available

    const { data, error, isLoading } = useSWR(
        'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/results',
        fetcher
    )

    if (error) return <div>failed to load: ({error})</div>
    if (isLoading) return <div>loading...</div>
    return (
        <>
            {JSON.stringify(data)}
        </>
    )
}