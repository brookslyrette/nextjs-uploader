import type { NextPage } from 'next'
import useRole from '../lib/hooks/useRole'
import styles from '../styles/Home.module.css'

const Upload: NextPage = () => {
  useRole('customer')

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Upload a log file
        </h1>

        <p className={styles.description}>
          Select a <b>*.tgz</b> file to get started
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.wideCard}>
            <h2>Select file &rarr;</h2>
            <p>Browse your computer and select a <b>*.tgz</b> file to share with our support team</p>
          </a>
        </div>
      </main>

    </div>
  )
}

export default Upload
