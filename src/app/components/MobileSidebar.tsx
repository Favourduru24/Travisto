'use client'
import Link from "next/link"
import Image from 'next/image'

const MobileSidebar = () => {
    return (
       <div className="mobile-sidebar wrapper">
         <header>
             <Link href='/' className='link-logo'>
            <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
             <h1>Tourvisto</h1>
        </Link>

        <button onClick={() => {}}>
           <Image src="/assets/icons/menu.svg" alt="menu" width={24} height={24} className="size-7"/>  
        </button>
         </header>
       </div>
    )
}

 export default MobileSidebar