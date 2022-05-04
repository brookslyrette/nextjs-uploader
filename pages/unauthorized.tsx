import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Header from '../components/Header'

const Unauthorized: NextPage = () => {
  const { data: session } = useSession()
  return (
    <>
      <Header session={session} />
      <div className='card'>
        <h2>
          Access Denied
        </h2>
        <p>
          You are not authorized to view this page.
        </p>
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
