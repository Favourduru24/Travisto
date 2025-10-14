import { NavItems, MobileSidebar } from "../components"
import RouteGuard from "@/app/components/RouteGuard"

const AuthLayout = ({children}: {
   children: React.ReactNode
    }) => {
     return (
         <main className="admin-layout">
           <MobileSidebar/>
           <aside className="w-full max-w-[270px] hidden lg:block">
             <NavItems/>
           </aside>
           <aside className="children">
            <RouteGuard>
             {children}
            </RouteGuard>
           </aside>
         </main>
          
     )
}

export default AuthLayout