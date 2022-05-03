import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import styles from '../styles/Main.module.css'
import Header from '../components/Header'
import useRole from '../lib/hooks/useRole'
import { File } from '../lib/model/model'
import FileList from '../components/FileList'

type State = 'loading' | 'loaded' | 'error'

const Uploads: NextPage = () => {
  useRole('support')

  const { data: session } = useSession()
  const [ files, setFiles ] = useState<File[]>([])
  const [ state, setState ] = useState<State>('loading')

  useEffect(()  => {
    (async () => {
      const res = await fetch('/api/storage/list')
      const files = await res.json()
      setFiles(files)
      setState('loaded')
    })();
  }, [])

  return (
    <>
      <Header session={session} />
      <div className={styles.grid}>
        <FileList files={files} state={state} />
      </div>
    </>
  )
}

export default Uploads
