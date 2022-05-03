import { File } from "../lib/model/model"

type FileItemProps = {
  file: File
}

export default function FileItem(props: FileItemProps) {
  const { file } = props
  return (
    <tr key={file.name}>
      <td>
        <a href={`/api/storage/download?filename=${encodeURIComponent(file.name)}`}>
          {file.name}
        </a>
      </td>
      <td>
        {file.size}
      </td>
      <td>
        {file.lastModified.toString()}
      </td>
    </tr>
  )
}