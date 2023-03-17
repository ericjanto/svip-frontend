import { Dispatch, RefObject, SetStateAction } from "react"
import useSWR, { Fetcher } from "swr"

type TagSuggestorProps = {
    currentEditedTag: string,
    currentQuery: string,
    setCurrentQuery: Dispatch<SetStateAction<string>>,
    setCurrentlyEditedTag: Dispatch<SetStateAction<string>>,
    queryInputRef: RefObject<HTMLInputElement>,
}

type TagApiResults = {
    [key: string]: {
        [key: string]: Array<Array<[string, number]>>
    }
}

const fetcher: Fetcher<TagApiResults> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
// const API_URL = 'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/tags'
const API_URL = 'http://localhost:5006/autocomplete'

export default function TagSuggestor({ currentEditedTag, setCurrentlyEditedTag, currentQuery, setCurrentQuery, queryInputRef }: TagSuggestorProps) {
    // Here, make request to tag autocomplete API
    const { data, error, isLoading } = useSWR(`${API_URL}?prefix=${encodeURIComponent(currentEditedTag.replace('#', '').replaceAll('_', ' '))}`, fetcher)

    const topFiveTags: any[] = []
    if (data) {
        const arr = Object.values(data)[0]

        arr["5"].forEach(element => {
            topFiveTags.push(element)
        })

    }

    const handleClick = (e: any) => {
        // Replace query text
        const suggestedTagText = '#' + e.target.innerText
        const updatedQuery = currentQuery.replace(currentEditedTag, suggestedTagText.replaceAll(' ','_'))
        setCurrentQuery(updatedQuery)

        // Focus back on query input field
        queryInputRef.current?.focus()

        // Don't suggest tags anymore
        setCurrentlyEditedTag('')
    }

    return (
        <div className="mb-[-22px] mt-4">
            {isLoading
                ? <div className="text-sm text-gray-500 pt-[0.35rem]">Loading tag suggestions...</div>
                : topFiveTags.length == 0
                    ?
                    <div className="text-sm">There are no similar tags!</div>
                    : topFiveTags.map(
                        (tagfreq) =>
                            <button
                                className="
                        relative
                        text-xs
                        p-1
                        pl-2
                        pr-2
                        bg-gray-100
                        rounded
                        transition
                        ease-in-out
                        mr-2
                        focus:bg-gray-200
                        hover:bg-gray-200
                        z-[9999999]
                        "
                                onClick={handleClick}
                                key={tagfreq[0]}
                            >
                                {tagfreq[0].toLowerCase()}
                                {/* <div>{tagfreq[1]}</div> */}
                            </button>
                    )
                // : <div>{JSON.stringify(data)}</div>
            }
        </div>
    )
}