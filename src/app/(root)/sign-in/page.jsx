'use client'
import Image from "next/image"
import Link from "next/link"

const SignIn = () => {

  const handleLogin = () => {
  window.location.href = "http://localhost:3000/auth/google/login";
};

   return (
     <div className="auth">
        <section className="size-full glassmorphism flex-center px-6">
           <div className="sign-in-card">
               <header className="header">
                 <Link href="/">
                     <Image 
                       src="/assets/icons/logo.svg"
                        alt="logo"
                        width={24}
                        height={24}
                        className="size-[30px]"
/>
                 </Link>
                 <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
               </header>

               <article>
                 <h2 className="p-28-semibold text-dark-100 text-center">Start Your Travel journey</h2>
                 <p className="p-18-regular text-center text-gray-100 !leading-7">Sign in with Google to manage destinations, itineraties, and user activity with ease</p>
               </article>

               <button className="button-class !h-11 !w-full cursor-pointer" onClick={handleLogin}>
                     <Image 
                       src="/assets/icons/google.svg"
                        alt="google"
                        width={24}
                        height={24}
                        className="size-5"
                         />
                   <span className="p-18-semibold text-white">Sign in with Google</span>
               </button>
           </div>
        </section>
     </div>
   )
}

export default SignIn