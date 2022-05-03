import { signIn, signOut } from "next-auth/react"

import styles from '../styles/Main.module.css'
import { Session } from 'next-auth'

type HeaderProps = {
  session: Session | null
}

function Header({ session }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <a href="/">Diag upload service</a>
      </h1>
      <span className={styles.userDetails}>
        {session ?
          (
            <div>
              <span>Logged in as {session.user.name},</span>
              &nbsp;<a href='#' onClick={() => signOut({
                callbackUrl: '/',
              })}>Log out</a>
            </div>
          ) :
          (
            <a href='#' onClick={() => signIn()}>Log in</a>
          )}
      </span>
    </header>
  )
}

export default Header
