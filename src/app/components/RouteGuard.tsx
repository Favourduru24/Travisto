'use client'
 import { useAuthStore } from "@/app/store"
import { useEffect} from "react"
import { useRouter } from "next/navigation"

const RouteGuard = ({children}) => {

    const {token, role} = useAuthStore()
    const router = useRouter()
        
       useEffect(() => {
          
          if(!token || role !== 'ADMIN') {
               router.push('/sign-in') 
          }
          
       }, [token, role])

  return (
    <>
     {children}
    </>
      )
    }

export default RouteGuard