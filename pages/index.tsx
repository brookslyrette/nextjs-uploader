import type { NextPage, NextPageContext } from 'next'
import { getSession, useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import Header from '../components/Header'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const isLoggedIn = !!session

  return (
    <>
    <Header session={session} />
      <div className='card'>
        {isLoggedIn ? (
          <>
            {session.user.role === 'customer' && (
              <Link href="/upload">
                <a>
                  <h2>Upload logs (*.tgz) &rarr;</h2>
                  <br />
                  <p>Click here to upload a log file to share with our support team</p>
                </a>
              </Link>
            )}

            {session.user.role === 'support' && (
              <Link href="/uploads">
                <a>
                  <h2>View logs &rarr;</h2>
                  <br />
                  <p>Click here to view uploaded logs files</p>
                </a>
              </Link>
            )}
          </>
        ) : (
          <a onClick={() => signIn()}>
            <h2>Get Started &rarr;</h2>
            <p>
              This application is written in TypeScript and uses Next.js. It supports two user roles: customer and support.
              Authentication is implmented using Next-Auth. All files are uploaded to Amazon S3.
            </p>
            <br />
            <p>Click here to log in and get started</p>
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
