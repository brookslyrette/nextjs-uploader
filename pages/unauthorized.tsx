import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signOut  } from 'next-auth/react'
import styles from '../styles/Home.module.css'

const Unauthorized: NextPage = () => {
  const { data: session } = useSession()
  return (
    <div className={styles.container}>
      <main className={styles.main}>
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

export default Unauthorized
