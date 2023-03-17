import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR, { Fetcher } from 'swr'

import ResultSetDisplayer from '../../components/ResultSetDisplayer'
import QueryInput from '../../components/QueryInput'
import { extractTagsFromPath, removeTags } from '../../utils'

type Results = {
  docId: Number,
  url: string,
  title: string,
  excerpt: string
}[]

const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
const API_URL = 'https://storyhunter.live/query'
// const API_URL = 'http://localhost:5006/query'
// const API_URL = 'http://localhost:5006/query'

export default function SearchPage() {

  const router = useRouter()
  var { searchQuery } = router.query

  if (Array.isArray(searchQuery)) {
    searchQuery = searchQuery.join('')
  }

  // For zero-based pagination, set initial state to 1 and start loop at 0
  const [cnt, setCnt] = useState(2)

  const tags = extractTagsFromPath(decodeURIComponent(router.asPath))
  
  // console.log(tags)
  // console.log(searchQuery)

  var initialTags: string[] = []
  tags.forEach((t) => initialTags.push(`#${t}`))

  var metadata: RegExpMatchArray | string | null = router.asPath.match(/\?(.*lastUpdatedTo=(?!#).*)/g)
  // console.log(metadata)
  if (metadata && metadata!.length > 0) {
    metadata = metadata![0].replace('?','&')
  }
  // console.log(metadata)

  var url = `${API_URL}?q=${removeTags(searchQuery)}&p=${cnt}&l=15`
  if (tags.length != 0) {
    url += `&tags=${tags.join(',')}`
  }

  if (metadata) {
    url += metadata
  }

  // console.log(url)

  // Revalidate if more results available
  const { data, error, isLoading } = useSWR(url, fetcher, { refreshInterval: 1000 });

  const pages = []
  for (let i = 1; i < cnt; i++) {
    var url = `${API_URL}?q=${removeTags(searchQuery)}&p=${i}&l=15`
    if (tags.length != 0) {
      url += `&tags=${tags.join(',')}`
    }

    if (metadata) {
      url += metadata
    }

    // console.log(url)
    pages.push(<ResultSetDisplayer fetchQuery={url} key={i} />)
  }

  return <div className='container px-8 sm:px-24 space-y-3 max-w-4xl'>
    <QueryInput initialState={searchQuery ? searchQuery! + initialTags.join(' ') : ''} resetCnt={setCnt} showFeatureDetector showMetadataFilter />
    <br />
    {pages}
    {pages.length > 1 && data?.length == 0
      ? (
        <div>
          <button onClick={() => window.scrollTo(0, 0)}
            className="
                px-6
                py-2
                w-full
                mt-5
                mb-5
              bg-orange-200
              text-gray-800
                font-medium
                text-sm
                leading-tight
                rounded
                shadow-md
              hover:bg-orange-300
                hover:shadow-lg
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
              active:bg-orange-400
                hover:cursor-pointer
                active:shadow-lg
                transition
                duration-150 ease-in-out"
          >
            All results shown, jump to top
          </button>
        </div>)
      : data?.length == 0
        ? <div className='py-8'>No more results found. If you expected more results, please check that you
          entered correct tags and metadata filters.</div>
        :
        (
          <div>
            <button onClick={() => setCnt(cnt + 1)}
              className="
                px-6
                py-2
                w-full
                mt-5
                mb-5
              bg-gray-200
              text-gray-800
                font-medium
                text-sm
                leading-tight
                rounded
                shadow-md
              hover:bg-gray-300
                hover:shadow-lg
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
              active:bg-gray-400
                hover:cursor-pointer
                active:shadow-lg
                transition
                duration-150 ease-in-out"
            >
              Show more results
            </button>
          </div>)
    }
  </div>
}