import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>TTDS Search Engine</title>
        <meta name="description" content="TTDS Search Engine" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <div>Home page. This will probably only show an input field, not much more.</div>
      </main>
    </>
  )
}
