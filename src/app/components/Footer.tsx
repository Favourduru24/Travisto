import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='wrapper flex sm:flex-row gap-4 items-center justify-between py-2'>
      <Link href='/' className='flex items-center gap-2'>
                          <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
                           <h1 className="text-base md:text-xl font-bold text-dark-100">Tourvisto</h1>
                      </Link>

       <div className='flex sm:flex-row flex-col gap-2 items-center text-gray-600 '>
        <p className='underline cursor-pointer text-sm'>Term & Conditions</p>
        <p className='underline cursor-pointer text-sm'>Privacy Policy</p>
       </div>
    </footer>
  )
}

export default Footer