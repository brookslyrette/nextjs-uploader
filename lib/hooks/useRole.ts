import { useSession } from "next-auth/react"
import Router from "next/router"
import { Role } from "../model/model"

// Given a role check if a user is in thate role
const useRole = (role: Role) => {
  const { data: session, status } = useSession({
    required: true,
  })

  if(status !== 'loading' && session?.user.role !== role) {
    Router.push('/unauthorized')
  }
}

export default useRole