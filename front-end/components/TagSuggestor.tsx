import { Dispatch, RefObject, SetStateAction } from "react"

type TagSuggestorProps = {
    currentEditedTag: string,
    currentQuery: string,
    setCurrentQuery:  Dispatch<SetStateAction<string>>,
    setCurrentlyEditedTag: Dispatch<SetStateAction<string>>,
    queryInputRef: RefObject<HTMLInputElement>,
}

export default function TagSuggestor({ currentEditedTag, setCurrentlyEditedTag, currentQuery, setCurrentQuery, queryInputRef }: TagSuggestorProps) {
    // Here, make request to tag autocomplete API
    const dummyTagSuggestions = ['tag1', 'tag2', 'tag3', 'tag4', 'tag4']

    const handleClick = (e: any) => {
        // Replace query text
        const suggestedTagText = '#' + e.target.innerText
        const updatedQuery = currentQuery.replace(currentEditedTag, suggestedTagText)
        setCurrentQuery(updatedQuery)

        // Focus back on query input field
        queryInputRef.current?.focus()

        // Don't suggest tags anymore
        setCurrentlyEditedTag('')
    }

    return (
        <div className="mb-[-22px] mt-4">
            {dummyTagSuggestions.map(
                (tag) =>
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
                key={tag}
            >
                {tag}
            </button>
            )}
        </div>
    )
}