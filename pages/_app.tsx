import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider} from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-row min-h-screen justify-center mx-8">
      <Head>
        <title>Diag upload service</title>
        <meta name="description" content="A nextjs demo project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <main className="container max-w-5xl">
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </div>
  )
}

export default MyApp
