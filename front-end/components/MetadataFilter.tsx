import { useRouter } from "next/router"
import { useState } from "react"


export default function MetadataFilter() {
    const router = useRouter()


    const [formData, setFormData] = useState({})
    const handleSubmit = (event: any) => {
        event.preventDefault()

        // Access form data using FormData API
        const formData = new FormData(event.target)
        const formValues = Object.fromEntries(formData.entries())
        setFormData(formValues)

        // Create query string from form data
        const queryString = Object.keys(formValues)
            .map(key => {
                let value: any = formValues[key]
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            })
            .join('&')

        let searchQuery = router.query.searchQuery
        if (Array.isArray(searchQuery)) {
            searchQuery = searchQuery.join('')
        }

        // Use Link component to navigate to new page with query parameters
        const href = `/search/${encodeURIComponent(searchQuery!)}?${queryString}`
        const as = href // Use same URL for server and client rendering
        console.log('doing this')
        router.push(href, as, { shallow: true }) // Navigate without full page refresh
    }

    return (
        <details className="text-sm" onSubmit={handleSubmit}>
            <summary className=" text-gray-500" >Tip: Use metadata filters for fine-tuned filtering</summary>
            <form>
                <ul className="list-disc ml-8">
                    <li>
                        Story consists of a single chapter only:{' '}
                        <br />
                        <input type="radio" id="true" name="singleChapter" value="true" />
                        <label htmlFor="true"> true </label>
                        <br />
                        <input type="radio" id="false" name="singleChapter" value="false" />
                        <label htmlFor="false"> false </label>
                    </li>
                    <li>
                        Story has following completion status:
                        <br />
                        <input type="radio" id="completed" name="completionStatus" value="completed" />
                        <label htmlFor="completed"> completed</label><br />
                        <input type="radio" id="in-progress" name="completionStatus" value="in-progress" />
                        <label htmlFor="in-progress"> in progress</label><br />
                    </li>
                    <li>
                        <label htmlFor="wordCountFrom">Minimum word count (&gt;0):</label><br />
                        <input type="number" id="wordCountFrom" name="wordCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="wordCountTo">Maximum word count (&gt;0):</label><br />
                        <input type="number" id="wordCountTo" name="wordCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="hitCountFrom">Minimum number of hit (&gt;0):</label><br />
                        <input type="number" id="hitCountFrom" name="hitCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="hitCountTo">Maximum number of hit (&gt;0):</label><br />
                        <input type="number" id="hitCountTo" name="hitCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="kudosCountFrom">Minimum number of kudos (&gt;0):</label><br />
                        <input type="number" id="kudosCountFrom" name="kudosCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="kudosCountTo">Maximum number of kudos (&gt;0):</label><br />
                        <input type="number" id="kudosCountTo" name="kudosCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="commentCountFrom">Minimum number of comment (&gt;0):</label><br />
                        <input type="number" id="commentCountFrom" name="commentCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="commentCountTo">Maximum number of comment (&gt;0):</label><br />
                        <input type="number" id="commentCountTo" name="commentCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="bookmarkCountFrom">Minimum number of bookmark (&gt;0):</label><br />
                        <input type="number" id="bookmarkCountFrom" name="bookmarkCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="bookmarkCountTo">Maximum number of bookmark (&gt;0):</label><br />
                        <input type="number" id="bookmarkCountTo" name="bookmarkCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="lastUpdatedFrom">Has been updated since</label><br />
                        <input type="date" id="lastUpdatedFrom" name="lastUpdatedFrom" />
                    </li>
                    <li>
                        <label htmlFor="lastUpdatedTo">Has been updated before</label><br />
                        <input type="date" id="lastUpdatedTo" name="lastUpdatedTo" />
                    </li>
                </ul>


                <input type="submit" value="Filter results" className="
                        py-3
                        px-6
                        mt-2
                        ml-8
                      bg-blue-600
                      text-white
                        font-medium
                        text-sm
                        leading-tight
                        uppercase
                        rounded
                        hover:bg-blue-700
                        focus:bg-blue-700
                        focus:outline-none
                        focus:ring-0
                        active:bg-blue-800
                        hover:cursor-pointer
                        active:shadow-lg
                        transition
                        duration-150 ease-in-out" />
            </form>
        </details>
    )
}