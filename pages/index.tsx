import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import Header from '../components/Header'
import styles from '../styles/Main.module.css'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const isLoggedIn = !!session

  return (
    <>
    <Header session={session} />
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
    </>
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
