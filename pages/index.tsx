import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://todo.org">File uploader</a>
        </h1>

        <p className={styles.description}>
          Get started by
        </p>

        <div className={styles.grid}>
          <Link href="/upload">
            <a className={styles.card}>
              <h2>Upload logs (*.tgz) &rarr;</h2>
              <p><b>Clients:</b> Log in and upload a log file to share with our support team</p>
            </a>
          </Link>

          <Link href="/uploads">
            <a className={styles.card}>
              <h2>View logs &rarr;</h2>
              <p><b>Support team:</b> Log in to view clinent logs for troubleshooting</p>
            </a>
          </Link>

        </div>
      </main>

    </div>
  )
}

export default Home
