'use client'
import {usePathname} from "next/navigation"
import Link from "next/link";
import Image from "next/image";

interface Props {
    title: string;
    description: string;
    ctaText?: string
    ctaUrl?: string
}

const Header = ({title, description, ctaText, ctaUrl}: Props) => {

const pathname = usePathname()

  return (
    <header className="header mb-6">
        <article>
            <h1 className={`${pathname === '/' ? 'text-2xl md:text-4xl font-bold' : 'text-xl md:text-2xl font-semibold'} text-dark-100`}>{title}</h1>
            <p className={`${pathname === '/' ? 'text-base md:text-lg ' : 'text-sm md:text-lg '} text-gray-100 font-normal`}>{description}</p>
        </article>

        {ctaText && ctaUrl && (
          <Link href={ctaUrl}>
            <button className="button-class !h-11 w-full md:w-[280px] cursor-pointer">
             <Image 
              src='/assets/icons/plus.svg'
               alt="plus"
               width={24}
               height={24}
               className="size-5"
             />
             <span className="p-16-semibold text-white">{ctaText}</span>
            </button>
          </Link>
        )}
     </header>
  )
}

export default Header