import { signIn, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import Link from 'next/link'

type HeaderProps = {
  session: Session | null
}

function Header({ session }: HeaderProps) {
  return (
    <header className="flex row items-center w-full justify-between my-8 py-2 border-b-2">
      <h1 className="text-3xl">
        <Link href='/'>
          <a>Diag upload service</a>
        </Link>
      </h1>
      {session ?
        (
          <div>
            <span>Logged in as {session.user.name},</span>
            &nbsp;<a className='link' onClick={() => signOut({
              callbackUrl: '/',
            })}>Log out</a>
          </div>
        ) :
        (
          <a className='link' onClick={() => signIn()}>Log in</a>
        )}
    </header>
  )
}

export default Header
