import { File } from "../lib/model/model"

type FileItemProps = {
  file: File
}

export default function FileItem(props: FileItemProps) {
  const { file } = props
  return (
    <tr key={file.name}>
      <td className="border-b border-slate-100 p-2 pl-8">
        <a className="link" href={`/api/storage/download?filename=${encodeURIComponent(file.name)}`}>
          {file.name}
        </a>
      </td>
      <td className="border-b border-slate-100 p-2 pl-8">
        {file.size}
      </td>
      <td className="border-b border-slate-100 p-2 pl-8">
        {file.lastModified.toString()}
      </td>
    </tr>
  )
}