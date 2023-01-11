import { useRouter } from 'next/router'
import { useState } from 'react'

import ResultPage from '../../components/ResultPage'
import QueryInput from '../../components/QueryInput'

export default function SearchPage() {
  const router = useRouter()
  const { searchQuery } = router.query

  // For zero-based pagination, set initial state to 1 and start loop at 0
  const [cnt, setCnt] = useState(2)
  const [finished, setFinished] = useState(false)

  const pages = []
  for (let i = 1; i < cnt; i++) {
    pages.push(<ResultPage query={searchQuery!} pageIndex={i} key={i} setFinished={setFinished} />)
  }

  return <div>
    <QueryInput initialState={searchQuery!} resetCnt={setCnt} />
    <br />
    {pages}
    {finished
      ? <div>That's all results!</div>
      : <button onClick={() => setCnt(cnt + 1)}>Show more results</button>
    }
  </div>
}