'use client'
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {imageGallery1, imageGallery2} from "@/app/constants"
 import {TripCard} from "@/app/components"
import {allTrips} from "@/app/constants"
import { useEffect } from "react"
import { useAuthStore } from "../store"
import { useRouter } from "next/navigation"

const Home = () => {

  //  const user = {
  //     name: 'Duru Pristine',
  //     email: 'durupristine@gmail.com',
  //     imageUrl: '/assets/images/david.webp'
  //   }

    const router = useRouter()

    const { setUser, user } = useAuthStore();

    useEffect(() => {
      // ✅ Initialize from localStorage on first render
  
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
  
      if (!token) return; // No token, skip fetching
  
      const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:4000/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (!res.ok) throw new Error("Failed to fetch user");
  
          const user = await res.json();
          setUser(user, token);
          router.push("/dashboard");
        } catch (error) {
          console.error("Error:", error);
          router.push("/sign-in");
        }
      };
  
      fetchUser();
    }, [router, setUser]);


  return (
    <>
    <div className="travel-hero">

      <header className="wrapper py-4 flex justify-between">
        <Link href='/' className='flex items-center gap-2'>
                    <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
                     <h1 className="text-base md:text-3xl font-bold text-white">Tourvisto</h1>
                </Link>
                <footer className="flex items-center gap-2.5">
                              
                
                              <article className="flex flex-col gap-2 max-w-[115px]">
                                <h2 className="text-sm md:text-base font-semibold text-black truncate hover:text-gray-100">{user?.username}</h2>
                              </article>
                              {/* <Image src={`${user?.profileUrl ? user?.profileUrl : '/assets/images/david.webp'} `} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/> */}
                              <button onClick={() => {console.log('Logout')}} className="cursor-pointer">
                                <Image src="/assets/icons/logout.svg"
                                  alt="logout"
                                  className="size-9 bg-gray-50/20 rounded-full hover:bg-white p-1"
                                  width={24}
                                  height={24}
                                />
                              </button>
                            </footer>
      </header>
      
        <div>
          <section className="wrapper">
             
             <article className="w-full h-full">
                <h1 className="text-6xl font-bold capitalize leading-18 ">Plan Your <br/> Trip with Ease</h1>
                <p className="">Customize your travel itenery in minute - Pick your destination, set your preferences and explore with confidence </p>

                <button className="!bg-primary-100 h-12 text-white font-semibold !rounded-md !shadow-none w-52 mt-1">
                   Get Started
                </button>
             </article>
          </section>
        </div>

       
    </div>

     <section className="wrapper sm:py-20 py-10">
             <div className="flex flex-col">
                <h2 className="text-3xl font-bold capitalize leading-12 ">Featured Travel Destinations</h2>
                <p className="text-lg font-normal text-gray-400">Check out some of the best place you can visit around the world.</p>
             </div>

               <div className="grid md:grid-cols-3 grid-cols-1 gap-4 ">

                  <section className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 mt-1 py-5 ">
                  {imageGallery1.map(({imageUrls, id, name}, i) => (
                    <Image src={imageUrls[0]} alt={name} key={id} width={500} height={500}
                      className={cn('w-full rounded-xl object-cover relative group', i === 0 ? 'md:col-span-2 md:row-span-2 h-[350px] ': 'md:row-span-1 h-[300px]')}
                    />
                    // <p className="absolute top-0 z-10">{name}</p>
                  ))}
                  
               </section>

               <section className="md:col-span-1 grid grid-cols-1 md:grid-rows-2 gap-5 mt-1 py-5 ">
                    {imageGallery2.map(({imageUrls, id, name}, i) => (
                    <img src={imageUrls[0]} alt={name} key={id}
                      className={'rounded-xl object-cover md:row-span-3 h-[210px] md:col-span-1 w-full'}
                    />
                  ))} 
               </section>
               </div>
               
        </section>

        <section className="wrapper mb-16">
             <div className="flex flex-col">
                <h2 className="text-3xl font-bold capitalize leading-12 ">Handpicked Trips</h2>
                <p className="text-lg font-normal text-gray-400 mb-8">Browse well planned trips designed for different travel style and interest.</p>
             </div>

               <div className="trip-grid">
                                   {allTrips.map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
                                       <TripCard 
                                       key={id}
                                       id={id.toString()}
                                       name={name}
                                       imageUrl={imageUrls[0]}  
                                       location={itinerary?.[0]?.location ?? ''}
                                       tags={tags}
                                       price={estimatedPrice}
                                   />
                                           ))}
                                </div>
             </section>
    </>
  )
}

 export default Home