import { File } from "../lib/model/model"
import FileItem from './FileItem'

type FileListProps = {
  files: File[]
  state: 'loading' | 'loaded' | 'error'
}

export default function FileList(props: FileListProps) {
  const { files, state } = props
  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Name</th>
          <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Size (bytes)</th>
          <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left">Last Modified</th>
        </tr>
      </thead>
      <tbody>
        {state === 'loaded' ? (
          files.map && files.map(file => <FileItem key={file.name} file={file} />)
        ) : (
          <tr>
            <td className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left" colSpan={3}>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}