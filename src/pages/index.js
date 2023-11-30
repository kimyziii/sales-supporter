import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sales-Supporter</title>
      </Head>
      <main>
        <div>Home Page</div>
        <style jsx>{`
          * {
            background-color: transparent;
          }
        `}</style>
      </main>
    </>
  )
}
