import { useRouter } from 'next/router'
import { useState } from 'react'

import ResultPage from '../components/ResultPage'

export default function SearchPage() {
  const router = useRouter()
  const query = router.query.query

  const [cnt, setCnt] = useState(2)


  // TODO: this doesn't work yet, pre-render state is different
  // if (!router.query.query) {
  //   console.log("push back to home page")
  //   router.push('/')
  // } else {
    const pages = []
    for (let i = 0; i < cnt; i++) {
      pages.push(<ResultPage query={query} pageIndex={i} key={i} />)
    }
  
    return <div>
      {pages}
      <button onClick={() => setCnt(cnt + 1)}>Load More</button>
    </div>
}