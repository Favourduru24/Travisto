import { NavItems, MobileSidebar } from "../components"

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
           {children}
           </aside>
         </main>
          
     )
}

export default AuthLayout