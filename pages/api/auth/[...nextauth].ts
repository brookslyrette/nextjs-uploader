import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '../../../lib/model/model'

if (!process.env.SUPPORT_PASSWORD) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('`CUSTOMER_PASSWORD` is not set in production')
  }
  console.warn('WARNING: `SUPPORT_PASSWORD` is not set, defaulting to "password"')
}
if (!process.env.CUSTOMER_PASSWORD) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('`CUSTOMER_PASSWORD` is not set in production')
  }
  console.warn('WARNING: `CUSTOMER_PASSWORD` is not set, defaulting to "password"')
}

const users: User[] = [
  {
    id: '87164fa7-b3a4-4ac3-9f9a-a8100af6a514',
    name: 'support',
    // in production, this should be encrypted and salted
    password: process.env.SUPPORT_PASSWORD || 'password',
    role: 'support'
  },
  {
    id: 'f4e64234-7923-45e3-90f6-071eddc9d176',
    name: 'customer',
    // in production, this should be encrypted and salted
    password: process.env.CUSTOMER_PASSWORD || 'password',
    role: 'customer'
  },
]

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Username', type: 'text', placeholder: 'username' },
        password: {  label: 'Password', type: 'password' }
      },
      async authorize(credentials, req): Promise<User | null> {
        if(!credentials) {
          return null
        }
        const user = users.find(u => u.name === credentials.name && u.password === credentials.password)
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    session({ session }) {
      const user = users.find(u => u.name === session.user.name)
      if (user?.role) {
        session.user.role = user.role
      }
      return session
    },
  },
  session: {
    strategy: 'jwt'
  },
  theme: {
    colorScheme: 'light',
  },
})