"use client"

import { Header, TripCard } from '@/app/components'
import Pagination from '@/app/components/Pagination'
import { getFirstWord } from '@/app/lib/utils'
import { getAllTrips, getTripById } from '@/app/service/trip-service'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TripsDetailPage = ({id, urlParamName, page}) => {

    const [tripDetail, setTripDetail] = useState<Trip>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string|null>(null)
    const [allTrips, setAllTrips] = useState<{ data: any[], meta: any }>({ data: [], meta: {} });

// groupType
    useEffect(() => {
       if(!id) return

       const fetchTripDetail = async () => {
         setLoading(true)
         setError(null)
         try {
          const res = await getTripById(id)
         setTripDetail(res)
         } catch (error) {
          setError('Something went wrong fetching this trip!')
         } finally{
            setLoading(false)
         }
         
       }
       fetchTripDetail()
    }, [id])

    
        useEffect(() => {
          const fetchAllTrips = async () => {
                setError(null)
                try {
              const res = await getAllTrips();
              setAllTrips(res);
              
            } catch (error) {
               setError('Something went wrong fetching related trips')
            }
          };
            
            fetchAllTrips();
          }, []);
    

    
     if(loading) {
         return (
           <div className="flex inset-0 fixed items-center justify-center bg-gray-50/50 z-50">
               <Loader2 className="w-16 h-16 animate-spin text-primary-100"/>
                          </div>
         )
            }

    const {
      name,
      duration,
      itinerary,
      travelStyle, 
      budget, 
      interests, 
      estimatedPrice, 
      groupType, 
      bestTimeToVisit, 
      description, 
      weatherInfo, 
      country, 
      images} = tripDetail || {}

    const pillItems = [
       {text: travelStyle, bg: '!bg-pink-50 !text-pink-500'},
       {text: groupType, bg: '!bg-primary-50 !text-primary-500'},
       {text: budget, bg: '!bg-success-50 !text-success-700'},
       {text: interests, bg: '!bg-navy-50 !text-navy-500'},
    ]

    const visitTimeAndWeatherInfo = [
      {title: 'Best Time to Visit', items: bestTimeToVisit},
      {title: 'Weather Info', items: weatherInfo},
    ]

  return (
    <div className="wrapper travel-detail">
      <Header 
        title='Trip Details'
        description='View and edit Ai generated travel plans'
      />
     
      <section className='container wrapper-md'>
     <header>
      <h1 className='p-40-semibold text-dark-100'>{name}</h1>
      
      <div className='flex items-center gap-5'>
        <figure className='info-pill'>
       <Image src="/assets/icons/calendar.svg" width={24} height={24} alt='calender'/>

         <figcaption>{duration} days plan</figcaption>
      </figure>

      <figure className='info-pill'>
       <Image src="/assets/icons/location-mark.svg" width={24} height={24} alt='calender'/>

         <figcaption>{itinerary?.slice(0, 4)?.map((item) => item.location).join(', ') || ''} days plan</figcaption>
      </figure>
      </div>
     </header>
      
         <section className='gallery'>
          {images?.map((url: any, i: number) => (
            <Image width={500} height={500} src={url.url} key={i} alt="image-grid" className={cn('w-full rounded-xl object-cover', i === 0 ? "md:col-span-2 md:row-span-2 h-[330px]" : 'md:row-span-1 h-[150px]')}/>
          ))}
         </section>

         <section className='flex gap-3 md:gap-5 items-center flex-wrap'>
             <div className='rounded-full flex gap-2'>
                {pillItems.map((pill, i) => (
                   <span key={i} className={`${pill.bg} !text-base !font-medium !px-4 py-2 rounded-full`}>
                       {getFirstWord(pill.text)}
                   </span>
                ))}
             </div>

             <ul className='flex gap-1 items-center'>
                  {Array(5).fill('null').map((_, index) => (
                     <li key={index}>
                       <Image 
                       src="/assets/icons/star.svg" 
                       alt='star' className='size-[18px]' 
                       width={24} height={24} />
                     </li>
                  ))}   

                  <li className='ml-1'>
                    <div className='rounded-full !bg-yellow-400 text-base !font-medium !px-2 py-1 '>
                       4.9/5 
                     </div>
                  </li> 
             </ul>
         </section>

           <section className='title'>
             <article>
               <h3>
                {duration} Day {country} {travelStyle} Trip
               </h3>

               <p>{budget}, {groupType} and {interests}</p>
             </article>

             <h2>{estimatedPrice}</h2>
            </section>  

            <p className='text-sm md:text-lg font-normal text-dark-400'>{description}</p>

            <ul className='itinerary'>
                {itinerary?.map((dayPlan, index) => (
                  <li key={index}>
                     <h3>
                      Day {dayPlan.day} : {dayPlan.location}
                     </h3>
                     <ul>{dayPlan.activities.map((activity, index) => (
                        <li key={index}>
                       <span className='flex-shrink-0 p-18-semibold'>
                        {activity.time}
                       </span>
                       <p className='flex-grow'>{activity.description}</p>
                        </li> 
                     ))}
                     </ul>
                  </li> 
                ))}
            </ul>

             {visitTimeAndWeatherInfo.map((section) => (
               <section key={section.title} className='visit'>
                    <div>
                       <h3>{section.title}</h3>

                      <ul>
                         {section.items?.map((item) => (
                           <li key={item}>
                             <p className='flex-grow'>{item}</p>
                           </li>
                         ))}
                      </ul> 
                    </div>
               </section>
             ))}

             <footer className=" w-full">
                            <button className="button-class !h-12 w-full cursor-pointer">
                               <p className='text-white text-sm font-semibold px-1'>Pay and join trip</p>
                               <span className="bg-white py-1 px-2.5 w-fit rounded-[20px] text-dark-100 text-sm font-semibold">{estimatedPrice}</span>
                            </button>
                    </footer>
      </section>

      <section className='flex flex-col gap-6'>
                <h2 className='p-24-semibold text-dark-100'>Popular Trips</h2>

                <div className="trip-grid">
                                    {allTrips.data.length > 0 ? allTrips?.data.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
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
                                                  <p className="text-lg font-medium text-red-400">{error}</p>
                                                  <p className="text-primary-100">No worries reload and try again!</p>
                                            </div>
                                           )}
                                </div>
                                 {allTrips.meta?.totalPage > 1 && <Pagination page={page} urlParamName={urlParamName} totalPages={allTrips.meta?.totalPage}/>}
             </section>
    </div>
  )
}

export default TripsDetailPage
