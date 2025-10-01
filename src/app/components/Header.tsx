'use client'
import {usePathname} from "next/navigation"

interface Props {
    title: string;
    description: string;
}

const Header = ({title, description}: Props) => {

const pathname = usePathname()

  return (
    <header className="header mb-6">
        <article>
            <h1 className={`${pathname === '/' ? 'text-2xl md:text-4xl font-bold' : 'text-xl md:text-2xl font-semibold'} text-dark-100`}>{title}</h1>
            <p className={`${pathname === '/' ? 'text-base md:text-lg ' : 'text-sm md:text-lg '} text-gray-100 font-normal`}>{description}</p>
        </article>
     </header>
  )
}

export default Header