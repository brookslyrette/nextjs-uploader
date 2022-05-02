export type Role = 'support' | 'customer'

export type User = {
  id: string,
  name: string,
  password: string,
  role: Role
}

export type File = {
  name: string
  size: number | undefined,
  lastModified: Date
}

export type FileList = File[]

export type FileUploadDetails = {
  url: URL,
  form: {
      [key: string]: string;
  }
}

export type APIError = {
  message: string
}