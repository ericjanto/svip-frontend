import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import FeatureDetector from "./FeatureDetector"
import TagSuggestor from "./TagSuggestor"
import MetadataFilter from "./MetadataFilter"

type QueryInputProps = {
    initialState?: string,
    resetCnt?: Dispatch<SetStateAction<number>>,
    showFeatureDetector?: boolean,
    showMetadataFilter?: boolean
}

export default function QueryInput({ initialState, resetCnt, showFeatureDetector, showMetadataFilter }: QueryInputProps) {
    const [searchQuery, setSearchQuery] = useState(initialState ? initialState : '')

    const handleChange = (e: any) => {
        const target = e.target
        setSearchQuery(target.value)
        handleCursorChange(e)
    }

    // Autofocus on page load
    const inputElement = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus()
        }
    }, []);

    // Determine cursor position for tag autocomplete
    const [currentlyEditedTag, setCurrentlyEditedTag] = useState('')
    const handleCursorChange = (e: { target: HTMLInputElement }) => {
        const cursorPos = e.target.selectionEnd
        if (cursorPos != null) {
            // Look back until whitespace or start of string, if # appears before it's a tag
            let start = cursorPos
            let end = 0
            var potentialTag = ''
            for (let i = start; i--; i >= end) {
                let currentChar = searchQuery.charAt(i)
                if (currentChar == ' ' || !currentChar) {
                    break
                } else {
                    potentialTag += currentChar
                }
            }

            potentialTag = potentialTag.split('').reverse().join('');

            // Look forward until whitespace or end of query
            start = cursorPos - 1
            end = searchQuery.length
            for (let i = start; i++; i < end) {
                let currentChar = searchQuery.charAt(i)
                if (currentChar == ' ' || !currentChar) {
                    break
                } else {
                    potentialTag += currentChar
                }
            }

            if (potentialTag.startsWith('#') && potentialTag.length > 1) {
                setCurrentlyEditedTag(potentialTag)
            } else if (potentialTag) {
                setCurrentlyEditedTag('')
            }
        }
    }

    return (
        <>
            {currentlyEditedTag
                ? <TagSuggestor
                    currentEditedTag={currentlyEditedTag}
                    setCurrentlyEditedTag={setCurrentlyEditedTag}
                    currentQuery={searchQuery}
                    setCurrentQuery={setSearchQuery}
                    queryInputRef={inputElement} />
                : <div className="min-h-[19.5px]"></div>
            }
            {/* {searchQuery} */}
            <form className="mt-[0!important]">
                <input
                    type="search"
                    name="q"
                    value={searchQuery}
                    onChange={handleChange}
                    onClick={handleChange}
                    onKeyUp={handleChange}
                    ref={inputElement}
                    className="
                        form-control
                        mt-8
                        w-5/6
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        border-r-0
                        rounded-l
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                />
                <Link href={`/search/${encodeURIComponent(searchQuery)}`} onClick={(e) => {
                    if (!searchQuery) e.preventDefault()
                    else if (resetCnt) resetCnt(2)
                }}>
                    <button type="submit" value="Search"
                        className="
                        hidden
                        sm:inline
                        px-6
                        pt-[11px]
                        pb-[9.5px]
                        w-1/6
                      bg-blue-600
                      text-white
                        font-medium
                        text-sm
                        leading-tight
                        uppercase
                        rounded-r
                        hover:bg-blue-700
                        focus:bg-blue-700
                        focus:outline-none
                        focus:ring-0
                        active:bg-blue-800
                        hover:cursor-pointer
                        active:shadow-lg
                        transition
                        duration-150 ease-in-out">
                        Search
                    </button>
                    <button type="submit" value="Search"
                        className="
                        inline
                        sm:hidden
                        px-6
                        pt-[10px]
                        pb-[13px]
                        w-1/6
                      bg-blue-600
                      text-white
                        font-medium
                        text-sm
                        leading-tight
                        uppercase
                        rounded-r
                        hover:bg-blue-700
                        focus:bg-blue-700
                        focus:outline-none
                        focus:ring-0
                        active:bg-blue-800
                        hover:cursor-pointer
                        active:shadow-lg
                        transition
                        duration-150 ease-in-out">
                        <MagnifyingGlassIcon />
                    </button>
                </Link>
            </form>
            {showFeatureDetector
                ? <FeatureDetector searchQuery={searchQuery} />
                : <></>}
            {showMetadataFilter
                ? <MetadataFilter />
                : <></>}
        </>
    )
}