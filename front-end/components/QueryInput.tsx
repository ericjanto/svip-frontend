import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import Link from "next/link"

import FeatureDetector from "./FeatureDetector"

type QueryInputProps = {
    initialState?: string,
    resetCnt?: Dispatch<SetStateAction<number>>,
    showFeatureDetector?: boolean
}

export default function QueryInput({ initialState, resetCnt, showFeatureDetector }: QueryInputProps) {
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
    const [currentEditedWord, setCurrentEditedWord] = useState(0)
    const handleCursorChange = (e: { target: HTMLInputElement }) => {
        const cursorPos = e.target.selectionEnd
        if (cursorPos != null) {
            // Look back until whitespace or start of string, if # appears before it's a tag
            console.log(searchQuery.charAt(cursorPos - 1))
            // setCurrentEditedWord()
        }
    }

    return (
        <>
            <form>
                <input
                    type="search"
                    value={searchQuery}
                    onChange={handleChange}
                    onClick={handleChange}
                    onKeyUp={handleChange}
                    ref={inputElement}
                    className="
                        mt-5
                        form-control
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
                <Link href={`/search/${searchQuery}`} onClick={(e) => {
                    if (!searchQuery) e.preventDefault()
                    else if (resetCnt) resetCnt(2)
                }}>
                    <input type="submit" value="Search"
                        className="
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
                        duration-150 ease-in-out"/>
                </Link>
            </form>
            {showFeatureDetector
                ? <FeatureDetector searchQuery={searchQuery} />
                : <></>}
            {currentEditedWord}
        </>
    )
}