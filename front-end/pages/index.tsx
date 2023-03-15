import QueryInput from "../components/QueryInput"

export default function HomePage() {
  return (
    <>
      <main>
        <h1 className="container mx-auto text-center text-lg mt-20">AO3 Search Engine</h1>
        <div className='container px-24 space-y-3 max-w-4xl mx-auto'>
          <QueryInput initialState='' />
        </div>
      </main>
    </>
  )
}
