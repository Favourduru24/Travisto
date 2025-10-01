'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { sidebarItems } from '../constants'
import {usePathname} from "next/navigation"

const NavItems = () => {

    const pathname = usePathname()
    const user = {
      name: 'Duru',
      email: 'durupristine@gmail.com',
      imageUrl: '/assets/images/david.webp'
    }

  return (
    <section className='nav-items bg-white'>
        <Link href='/' className='link-logo'>
            <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
             <h1>Tourvisto</h1>
        </Link>

        <div className='container'>
            <nav>
              {sidebarItems.map(({id, href, icon, label}) => (
                  <Link key={id} href={href}>
                     <div className={`group nav-item ${pathname === href ? 'bg-primary-100 !text-white' : ''}`}>
                         <Image src={icon} alt={label} className={`group-hover:brightness-0 size-0 group-hover:invert ${pathname === href ? 'brightness-0 invert' : ''}`} width={24} height={24}/>
                         {label}
                     </div>
                  </Link>
              ))}  
            </nav>

            <footer className="nav-footer">
              <Image src={user.imageUrl} width={24} height={24} alt={user.name}/>

              <article>
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
              </article>
              <button onClick={() => {console.log('Logout')}} className="cursor-pointer">
                <Image src="/assets/icons/logout.svg"
                  alt="logout"
                  className="size-6"
                  width={24}
                  height={24}
                />
              </button>
            </footer>
        </div>
    </section>
  )
}

export default NavItems