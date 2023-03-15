export default function MetadataFilter() {
    return (
        <details className="text-sm">
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
                        <label htmlFor="hitsCountFrom">Minimum number of hits (&gt;0):</label><br />
                        <input type="number" id="hitsCountFrom" name="wordCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="hitsCountTo">Maximum number of hits (&gt;0):</label><br />
                        <input type="number" id="hitsCountTo" name="hitsCountTo" min="1" className="border" />
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
                        <label htmlFor="commentsCountFrom">Minimum number of comments (&gt;0):</label><br />
                        <input type="number" id="commentsCountFrom" name="commentsCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="commentsCountTo">Maximum number of comments (&gt;0):</label><br />
                        <input type="number" id="commentsCountTo" name="commentsCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="bookmarksCountFrom">Minimum number of bookmarks (&gt;0):</label><br />
                        <input type="number" id="bookmarksCountFrom" name="bookmarksCountFrom" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="bookmarksCountTo">Maximum number of bookmarsk (&gt;0):</label><br />
                        <input type="number" id="bookmarksCountTo" name="bookmarksCountTo" min="1" className="border" />
                    </li>
                    <li>
                        <label htmlFor="lastUpdatedFrom">Has been updated since</label><br />
                        <input type="date" id="lastUpdatedFrom" name="lastUpdatedFrom" />
                    </li>
                    <li>
                        <label htmlFor="lastUpdated">Has been updated before</label><br />
                        <input type="date" id="dateTo" name="lastUpdatedTo" />
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