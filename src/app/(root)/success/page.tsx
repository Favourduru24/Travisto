'use client'
import Image from "next/image"
import Link from "next/link"
import {ArrowLeft} from "lucide-react"

const SuccessPayment = () => {

      

   return (
     <div className="w-full h-screen flex">
        <section className="size-full glassmorphism flex-center px-6">
           <div className="sign-in-card">
               <header className="header">
                 <Link href="/">
                     <Image 
                       src="/assets/icons/check.svg"
                        alt="logo"
                        width={24}
                        height={24}
                        className="size-[70px]"
                     />
                 </Link>
               </header>

               <article>
                 <h2 className="p-28-semibold text-dark-100 text-center">Thank you & Welcome Aboard!</h2>
                 <p className="p-18-regular text-center text-gray-100 !leading-7">Your trip's booked -- can't wait to have you on this advanture Get ready to explore & make memories</p>
               </article>

                    <Link href="/">
                  <button className="button-class !h-11 !w-full cursor-pointer">
                      <ArrowLeft className="text-white size-5"/>
                   <span className="text-[15px] leading-[14px] font-medium text-white">Return to homepage</span>
               </button>
                 </Link>
           </div>
        </section>
     </div>
   )
}

export default SuccessPayment