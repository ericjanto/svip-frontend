import { useRouter } from 'next/router'
import { useState } from 'react'

import ResultSetDisplayer from '../../components/ResultSetDisplayer'
import QueryInput from '../../components/QueryInput'
import useSWR, { Fetcher } from 'swr'

type Results = {
  docId: Number,
  url: string,
  title: string,
  excerpt: string
}[]

const fetcher: Fetcher<Results> = (url: RequestInfo | URL) => fetch(url).then(r => r.json())
const API_URL = 'https://63be76d1e348cb07620f5001.mockapi.io/api/mock/documents'

export default function SearchPage() {
  
  const router = useRouter()
  var { searchQuery } = router.query

  if (Array.isArray(searchQuery)) {
    searchQuery = searchQuery.join(' ')
  }
  
  // For zero-based pagination, set initial state to 1 and start loop at 0
  const [cnt, setCnt] = useState(2)
  const [finished, setFinished] = useState(false)

  // Revalidate if more results available
  const { data, error, isLoading } = useSWR(`${API_URL}?query=${searchQuery}&p=${cnt}&l=15`, fetcher, {refreshInterval: 1000});

  const pages = []
  for (let i = 1; i < cnt; i++) {
    pages.push(<ResultSetDisplayer query={searchQuery!} pageIndex={i} key={i} setFinished={setFinished} />)
  }

  return <div className='container px-24 space-y-3 max-w-4xl'>
    <QueryInput initialState={searchQuery!} resetCnt={setCnt} showFeatureDetector/>
    <br />
    {pages}
    
    {finished || data?.length == 0
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
      : (
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