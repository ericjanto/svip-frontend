export default function MetadataFilter() {
    return (
        <details>
            <summary>Metadata Filter</summary>
        <form>
            singleChapter:
            <br />
            <input type="radio" id="true" name="singleChapter" value="true" />
            <label htmlFor="true">true</label><br />
            <input type="radio" id="false" name="singleChapter" value="false" />
            <label htmlFor="false">false</label><br />

            <hr />

            completionStatus:
            <br />
            <input type="radio" id="completed" name="completionStatus" value="completed" />
            <label htmlFor="completed">completed</label><br />
            <input type="radio" id="in-progress" name="completionStatus" value="in-progress" />
            <label htmlFor="in-progress">in progress</label><br />

            <hr />

            <input type="number" id="wordCountFrom" name="wordCountFrom" min="1" className="border" />
            <label htmlFor="wordCountFrom">wordCountFrom (&gt;0):</label><br />

            <hr />

            <input type="number" id="wordCountTo" name="wordCountTo" min="1" className="border" />
            <label htmlFor="wordCountTo">wordCountTo (&gt;0):</label><br />

            <hr />

            <input type="number" id="hitsCountFrom" name="wordCountFrom" min="1" className="border" />
            <label htmlFor="hitsCountFrom">hitsCountFrom (&gt;0):</label><br />

            <hr />

            <input type="number" id="hitsCountTo" name="hitsCountTo" min="1" className="border" />
            <label htmlFor="hitsCountTo">hitsCountTo (&gt;0):</label><br />

            <hr />

            <input type="number" id="kudosCountFrom" name="kudosCountFrom" min="1" className="border" />
            <label htmlFor="kudosCountFrom">kudosCountFrom (&gt;0):</label><br />

            <hr />

            <input type="number" id="kudosCountTo" name="kudosCountTo" min="1" className="border" />
            <label htmlFor="kudosCountTo">kudosCountTo (&gt;0):</label><br />

            <hr />

            <input type="number" id="commentsCountFrom" name="commentsCountFrom" min="1" className="border" />
            <label htmlFor="commentsCountFrom">commentsCountFrom (&gt;0):</label><br />

            <hr />

            <input type="number" id="commentsCountTo" name="commentsCountTo" min="1" className="border" />
            <label htmlFor="commentsCountTo">commentsCountTo (&gt;0):</label><br />

            <hr />

            <input type="number" id="bookmarksCountFrom" name="bookmarksCountFrom" min="1" className="border" />
            <label htmlFor="bookmarksCountFrom">bookmarksCountFrom (&gt;0):</label><br />

            <hr />

            <input type="number" id="bookmarksCountTo" name="bookmarksCountTo" min="1" className="border" />
            <label htmlFor="bookmarksCountTo">bookmarksCountTo (&gt;0):</label><br />

            <hr />

            <input type="date" id="lastUpdatedFrom" name="lastUpdatedFrom" />
            <label htmlFor="lastUpdatedFrom">lastUpdatedFrom</label><br />

            <hr />

            <input type="date" id="dateTo" name="lastUpdatedTo" />
            <label htmlFor="lastUpdated">lastUpdatedTo</label><br />

            <hr />

            <input type="submit" value="Filter results" className="border" />
        </form>
        </details>
    )
}