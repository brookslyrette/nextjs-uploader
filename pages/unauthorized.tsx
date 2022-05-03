import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signOut } from 'next-auth/react'
import Header from '../components/Header'
import styles from '../styles/Main.module.css'

const Unauthorized: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Header session={session} />
      <h1 className={styles.title}>
        Access Denied
      </h1>
      <p>
        {!!session && `Logged in as ${session?.user.name} `}
      </p>
      {!!session && (
        <a href='#' onClick={() => signOut({
          callbackUrl: '/',
        })}>Log out</a>
      )}
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
