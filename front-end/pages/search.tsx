import Head from 'next/head'

import Searcher from '../components/Searcher'

export default function SearchPage() {
  // Query passed via URL
  const query = ''
  return (
    <>
      <Head>
        <title>TTDS Search Engine</title>
        <meta name="description" content="TTDS Search Engine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <div>
          Search Page. This is where results will be displayed.
          If no query in URL direct back to index page.
        </div>
        <Searcher query={query} />
      </main>
    </>
  )
}