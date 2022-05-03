import React from 'react'

import type { NextPage } from 'next'
import useRole from '../lib/hooks/useRole'
import styles from '../styles/Main.module.css'
import Header from '../components/Header'
import { useSession } from 'next-auth/react'

type UploadState = 'select' | 'in-progress' | 'complete'

const Upload: NextPage = () => {
  useRole('customer')
  const { data: session } = useSession()

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [ state, setState ] = React.useState<UploadState>('select');

  const openFileSelect = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const encodedFileName = encodeURIComponent(file.name);
      const requestUploadFormData = new FormData();
      requestUploadFormData.append('filename', encodedFileName);

      const res = await fetch(`/api/storage/upload?filename=${encodedFileName}`, {
        method: 'POST',
        body: requestUploadFormData,
      })
      const uploadDetails = await res.json();

      const formData = new FormData();
      for (const name in uploadDetails.form) {
        formData.append(name, uploadDetails.form[name]);
      }
      formData.append('file', file);

      setState('in-progress');

      await fetch(uploadDetails.url, {
        method: 'POST',
        body: formData,
      })

      setState('complete');
    }
  }

  const handleReset = () => {
    setState('select');
  }

  return (
    <>
      <Header session={session} />
      <div className={styles.grid}>
        {state === 'select' && (
          <div onClick={() => openFileSelect()} className={styles.wideCard}>
            <h2>Select file &rarr;</h2>
            <p>Browse your computer and select a <b>*.tgz</b> file to share with our support team</p>
          </div>
        )}

        {state === 'in-progress' && fileRef.current?.files && (
          <div className={styles.wideCard}>
            <h2>Uploading &hellip;</h2>
            <p>Uploading {fileRef.current?.files[0].name} file to share with our support team</p>
          </div>
        )}

        {state === 'complete' && fileRef.current?.files && (
          <div className={styles.wideCard}>
            <h2>Thank you for uploading {fileRef.current?.files[0].name}</h2>
            <p>A support agent will get back to you shortly</p>
            <p>
              <a href='#' onClick={() => handleReset()}>
                If you&apos;d like to upload another file click here
              </a>
            </p>
          </div>
        )}

        <input onChange={handleFileSelected} type="file" hidden={true} ref={fileRef} accept=".tgz, application/gzip, application/x-gzip" />
      </div>
    </>
  )
}


export default Upload
