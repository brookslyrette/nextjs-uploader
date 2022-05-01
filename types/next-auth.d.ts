import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "../pages/api/auth/[...nextauth]"

declare module "next-auth" {
  interface Session {
    user: {
      username: string
      role: Role
    } & DefaultSession["user"]
  }
}