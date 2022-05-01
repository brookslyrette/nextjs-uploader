export type Role = 'support' | 'customer'

export type User = {
  id: string,
  name: string,
  password: string,
  role: Role
}