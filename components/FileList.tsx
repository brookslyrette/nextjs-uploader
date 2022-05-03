import { File } from "../lib/model/model"
import FileItem from './FileItem'
import styles from '../styles/Main.module.css'

type FileListProps = {
  files: File[]
  state: 'loading' | 'loaded' | 'error'
}

export default function FileList(props: FileListProps) {
  const { files, state } = props
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size (bytes)</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        {state === 'loaded' ? (
          files.map && files.map(file => <FileItem key={file.name} file={file} />)
        ) : (
          <tr>
            <td colSpan={3}>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}