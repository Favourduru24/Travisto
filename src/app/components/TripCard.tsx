'use client'
import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import { getFirstWord } from "../lib/utils"

const TripCard = ({id, name, location, imageUrl, tags, price}) => {

  const pathname = usePathname()

  return (
    <Link className='trip-card' href={`${pathname === '/' || pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`}`}>
         <Image src={imageUrl} alt={name} width={500} height={500} className=""/>

         <article>
          <h2>{name}</h2>
          <figure>
             <Image
                src='/assets/icons/location-mark.svg'
                width={24}
                height={24}
                alt="location"
                className="size-4"
             />
             <figcaption>{location}</figcaption>
          </figure>
         </article>

         <div className="mt-5 pl-[18px] pr-3.5 pb-5 flex gap-2">
            {tags.map((tag, index) => (
               <div key={index} className={`${index === 1 ? '!bg-pink-50 !text-pink-500' : '!bg-success-50 !text-success-700'} p-2 rounded-full text-sm`}>
                   {getFirstWord(tag)}
               </div>
            ))}
         </div>

         <article className="tripCard-pill">{price}</article>
    </Link>
  )
}

export default TripCard