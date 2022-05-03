import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider} from "next-auth/react"

import styles from '../styles/Main.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Diag upload service</title>
        <meta name="description" content="A nextjs demo project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </div>
  )
}

export default MyApp
