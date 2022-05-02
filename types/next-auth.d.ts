import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "../lib/model/model"

declare module "next-auth" {
  interface Session {
    user: {
      username: string
      role: Role
    } & DefaultSession["user"]
  }
}