'use client'
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
 import {TripCard} from "@/app/components"
import { useEffect, useState } from "react"
import { useRouter} from "next/navigation"
import { getAllTrips } from "@/app/service/trip-service"
import {LogOut, LogIn, Loader2} from 'lucide-react'
import { useAuthStore } from "@/app/store"
import Pagination from "@/app/components/Pagination"
import Footer from "@/app/components/Footer"


const RootPage = ({page, urlParamName}) => {

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string|null>(null)

    const {user, logout, role } = useAuthStore();
     const limit = 8;

   const [allTrips, setAllTrips] = useState<{ data: any[], meta: any }>({ data: [], meta: {} });

    useEffect(() => {
        
          const fetchAllTrips = async () => {
             setLoading(true)
             setError(null)
            try { 
          const res = await getAllTrips({ page, limit });
          setAllTrips(res);
            } catch(err) {
            setError('Something went wrong fetching trips')
            console.error("Failed to fetch trips:", err);
           } finally{
                setLoading(false)
          }
        };
        
        fetchAllTrips();
      }, [page, limit]);

      if(loading) {
            return (
              <div className="flex inset-0 fixed items-center justify-center bg-gray-50/50 z-50">
                  <Loader2 className="w-16 h-16 animate-spin text-primary-100"/>
              </div>
            )
          }

       
  return (
    <>
    <div className="travel-hero">

      <header className="wrapper py-4 flex justify-between">
        <Link href='/' className='flex items-center gap-2'>
                    <Image src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' width={24} height={24}/>
                     <h1 className="text-base md:text-3xl font-bold text-white">Tourvisto</h1>
                </Link>
                <footer className="flex items-center gap-2">
                               
                               <Link href={`${role === 'ADMIN' ? '/dashboard'  : '/'}`}>
                              <article className="flex flex-col g max-w-[115px] leading-0 gap-1 p-2 rounded-sm justify-start items-end hover: text-white cursor-pointer">
                                <h2 className="text-sm md:text-base font-semibold text-white truncate ">{user?.username}</h2>
                                <p className="text-xs text-green-400 rounded-full leading-0 font-semibold">{role?.toLowerCase()}</p>
                              </article>
                               </Link>

                             {user?.profileUrl && <Image src={user?.profileUrl} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/>}
                              <button onClick={() => logout()} className="cursor-pointer">
                                 
                                {user ? ( <LogOut 
                                  className="size-9 text-primary-100 hover:text-white hover:bg-gray-50/20 rounded-full bg-white p-1"
                                /> ) : (
                                  <Link href='/sign-in'>
                                <LogIn 
                                  className="size-9 text-primary-100 hover:text-white hover:bg-gray-50/20 rounded-full bg-white p-1"
                                  />
                                  </Link>
                                )}
                              </button>
                            </footer>
      </header>
      
        <div>
          <section className="wrapper">
             
             <article className="w-full h-full">
                <h1 className="text-6xl font-bold capitalize leading-18 ">Plan Your <br/> Trip with Ease</h1>
                <p className="">Customize your travel itenery in minute - Pick your destination, set your preferences and explore with confidence </p>
                <Link href="#trip">
                 <button className="!bg-primary-100 h-12 text-white font-semibold !rounded-md !shadow-none w-52 mt-1 cursor-pointer">
                   Get Started
                </button>
                </Link>
               
             </article>
          </section>
        </div>

       
    </div>

     <section className="wrapper sm:py-20 py-10">
             <div className="flex flex-col">
                <h2 className="text-3xl font-bold capitalize leading-12 ">Featured Travel Destinations</h2>
                <p className="text-lg font-normal text-gray-400">Check out some of the best place you can visit around the world.</p>
             </div>

               <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
  {/* Left big section */}
  <section className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-5 mt-1 py-5">
  {allTrips.data.length > 0 ? allTrips?.data.slice(0, 3)?.map(({ images, id, name, description, estimatedPrice }, tripIndex) => (
    <Link 
      href={`/travel/${id}`}
      key={id}
      className={cn(
        "relative group rounded-xl overflow-hidden",
        // Make the first card span bigger like a hero
        tripIndex === 0
          ? "md:col-span-2 md:row-span-2 h-[350px]"
          : "h-[300px]"
      )}
    >
      <Image
        src={images?.[0]?.url} 
        alt={name}
        fill
        className="object-cover"
      />

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 drop-shadow-lg flex flex-col bg-gradient-to-b from-transparent to-black/70 p-4 w-full">
        <p className="text-2xl font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-200 mt-1 max-w-md">
          {description.slice(0, 100)}...
        </p>
      </div>

      {/* Price tag */}
      <div className="bg-white py-1 px-2.5 w-fit rounded-[20px] absolute top-2.5 left-4 text-dark-100 text-sm font-semibold drop-shadow-lg flex flex-col">
        <article>{estimatedPrice}</article>
      </div>
    </Link>
  ))
  : (
            <div className="flex flex-col gap-3 justify-center">
                   <p className="text-xl font-semibold text-dark-100">No Trips Available now!</p>
                  <p className="font-medium text-red-400 sm:text-lg text-sm">{error}</p>
            </div>
        )}
</section>


  {/* Right tall section */}
  <section className="md:col-span-1 grid grid-cols-1 md:grid-rows-2 gap-5 mt-1 py-5">
    {allTrips.data.length > 0 ? allTrips?.data?.slice(0, 3)?.map(({ images, id, name, interests, description, estimatedPrice }, i) => (
      <Link key={id} className="relative rounded-xl overflow-hidden h-[210px] md:col-span-1" href={`/travel/${id}`}>
        <img
          src={images[1]?.url}
          alt={name}
          className="object-cover w-full h-full"
        />

        {/* Overlay text */}
         <div className="absolute bottom-0 left-0 drop-shadow-lg flex flex-col p-4 w-full">
          <p className="text-2xl font-semibold text-white">{interests}</p>
           <div className="flex items-center gap-2">
             
          <p className="text-sm text-gray-200 mt-1 max-w-md">{description.slice(0, 50)}...</p>
           </div>

        </div>

        <div className="bg-white py-1 px-2.5 w-fit rounded-[20px] absolute top-2.5 left-4 text-dark-100 text-sm font-semibold drop-shadow-lg flex flex-col">
                <article className="">{estimatedPrice}</article>
        </div>
      </Link>
    )) :(
            <div className="flex flex-col gap-3 justify-center">
                   <p className="text-xl font-semibold text-dark-100">No Trips Available now!</p>
                  <p className="font-medium text-red-400 sm:text-lg text-sm">{error}</p>
            </div>
              )}
  </section>
</div>

               
        </section>

        <section className="wrapper mb-16" id="trip">
             <div className="flex flex-col">
                <h2 className="text-3xl font-bold capitalize leading-12 ">Handpicked Trips</h2>
                <p className="text-lg font-normal text-gray-400 mb-8">Browse well planned trips designed for different travel style and interest.</p>
             </div>

               <div className="trip-grid">
                                   {allTrips.data.length > 0 
                                   ? allTrips?.data?.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
                                       <TripCard 
                                       key={id}
                                       id={id.toString()}
                                       name={name}
                                       imageUrl={images[0]}  
                                       location={itinerary?.[0]?.location ?? ''}
                                       tags={[interests, travelStyle]}
                                       price={estimatedPrice}
                                   />
                                           )) : (
                                            <div className="flex flex-col gap-5 w-full justify-center">
                                                  <p className="text-lg sm:text-xl font-semibold text-dark-100">No Trips Available now!</p>
                                                  <p className="text-primary-100">No worries reload and try again!</p>
                                            </div>
                                           )}
                                            
                                </div>

                                {allTrips.meta?.totalPage > 1 && <Pagination page={page} urlParamName={urlParamName} totalPages={allTrips.meta?.totalPage}/>}
             </section>

             <Footer/> 
    </>
  )
}

 export default RootPage