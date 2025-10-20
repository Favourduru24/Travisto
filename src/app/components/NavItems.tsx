'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { sidebarItems } from '../constants'
import {usePathname} from "next/navigation"
import { useAuthStore } from '../store'
import {LogOut} from 'lucide-react'

const NavItems = () => {

    const pathname = usePathname()
    // const user = {
    //   name: 'Duru',
    //   email: 'durupristine@gmail.com',
    //   imageUrl: '/assets/images/david.webp'
    // }

     const {user, logout} = useAuthStore();

  return (
    <section className='nav-items bg-white fixed'>
        <Link href='/' className='link-logo'>
            <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
             <h1>Tourvisto</h1>
        </Link>

        <div className='container'>
            <nav>
              {sidebarItems.map(({id, href, icon, label}) => (
                  <Link key={id} href={href}>
                     <div className={`group nav-item ${pathname === href ? 'bg-primary-100 !text-white' : ''}`}>
                         <Image src={icon} alt={label} className={`group-hover:brightness-0 size- group-hover:invert ${pathname === href ? 'brightness-0 invert' : ''}`} width={24} height={24}/>
                         {label}
                     </div>
                  </Link>
              ))}  
            </nav>

            <footer className="nav-footer">
               {user?.profileUrl && <Image src={user?.profileUrl} width={24} height={24} alt={user?.username}/>}

              <article>
                <h2>{user?.username ? user?.username : 'User Guest'}</h2>
                <p>{user?.email  ? user?.email : 'guest@gmail.com'}</p>
              </article>
              <button onClick={() => logout()} className="cursor-pointer">
                <LogOut 
                   className="size-9 text-primary-100 hover:bg-gray-50/20 rounded-full bg-white p-1"
                />
              </button>
            </footer>
        </div>
    </section>
  )
}

export default NavItems