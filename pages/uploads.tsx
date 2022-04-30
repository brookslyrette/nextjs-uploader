import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Uploads: NextPage = () => {
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
          // TODO
        </div>
      </main>

    </div>
  )
}

export default Uploads
