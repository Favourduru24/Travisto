'use client'
 import { useAuthStore } from "@/app/store"
import { useEffect} from "react"
import { useRouter } from "next/navigation"

const RouteGuard = ({children}) => {

    const {token} = useAuthStore()
    const router = useRouter()
        
       useEffect(() => {
          
          if(!token) {
               router.replace('/sign-in') 
          }
          
       }, [token])

  return (
    <>
     {children}
    </>
      )
    }

export default RouteGuard