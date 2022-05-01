import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const isLoggedIn = !!session

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="/">Diag upload service</a>
        </h1>

        <div className={styles.grid}>
          {isLoggedIn ? (
            <>
              {session.user.role === 'customer' && (
                <Link href="/upload">
                  <a className={styles.wideCard}>
                    <h2>Upload logs (*.tgz) &rarr;</h2>
                    <p><b>Clients:</b> Log in and upload a log file to share with our support team</p>
                  </a>
                </Link>
              )}

              {session.user.role === 'support' && (
                <Link href="/uploads">
                  <a className={styles.wideCard}>
                    <h2>View logs &rarr;</h2>
                    <p><b>Support team:</b> Log in to view clinent logs for troubleshooting</p>
                  </a>
                </Link>
              )}
            </>
          ) : (
            <a onClick={() => signIn()} className={styles.wideCard}>
              <h2>Login &rarr;</h2>
              <p>Log in to get started</p>
            </a>
          )}

        </div>
      </main>

    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default Home
