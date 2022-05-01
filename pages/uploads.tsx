import type { NextPage } from 'next'
import useRole from '../lib/hooks/useRole'
import styles from '../styles/Home.module.css'

const Uploads: NextPage = () => {
  useRole('support')

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Uploaded log files
        </h1>

        <p className={styles.description}>
          Select a log file for download
        </p>

        <div className={styles.grid}>

        </div>
      </main>

    </div>
  )
}

export default Uploads
