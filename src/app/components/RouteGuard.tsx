'use client'
 import { useAuthStore } from "@/app/store"
import { useEffect} from "react"
import { useRouter } from "next/navigation"

const RouteGuard = ({children}: { children: React.ReactNode }) => {

    const {token, role, hasHydrated} = useAuthStore()
    const router = useRouter()
        
       useEffect(() => {
            if (!hasHydrated) return;
          
          if(!token || role !== 'ADMIN') {
               router.push('/sign-in') 
          }
          
       }, [token, role, router, hasHydrated])

  return (
    <>
     {children}
    </>
      )
    }

export default RouteGuard