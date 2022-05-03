import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signOut } from 'next-auth/react'
import Header from '../components/Header'
import styles from '../styles/Main.module.css'

const Unauthorized: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Header session={session} />
      <div className={styles.grid}>
        <div className={styles.wideCard}>
          <h2>
            Access Denied
          </h2>
          <p>
            You are not authorized to view this page.
          </p>
        </div>
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

export default Unauthorized
