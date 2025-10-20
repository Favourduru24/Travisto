 'use client'
 import {Header, TripCard} from "@/app/components"
import Pagination from "@/app/components/Pagination"
 import {allTrips} from "@/app/constants"
 import {Loader2} from 'lucide-react'
import { getAllTrips } from "@/app/service/trip-service"
 import {useState, useEffect} from "react"

const Trips = ({page, urlParamName}) => {

    const [allTrips, setAllTrips] = useState<{ data: any[], meta: any }>({ data: [], meta: {} });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
     const limit = 6

    useEffect(() => {
      const fetchAllTrips = async () => {
        setLoading(true);   // start loading
        setError(null);     // reset errors
    
        try {
          const res = await getAllTrips({ limit, page });
          setAllTrips(res);
        } catch (err: any) {
          console.error("Failed to fetch trips:", err);
          setError("Something went wrong while fetching trips.");
        } finally {
          setLoading(false); // stop loading
        }
      };
    
      fetchAllTrips();
    }, [limit, page]);

    if(loading) {
      return (
        <div className="flex inset-0 fixed items-center justify-center bg-gray-50/50 z-50">
            <Loader2 className="w-16 h-16 animate-spin text-primary-100"/>
        </div>
      )
    }

    
    return (
        <main className="all-users wrapper">
       <Header
               title='Trips'
               description="View and edit AI-generated travel plans."
               ctaText="Create a trip"
               ctaUrl="/trips/create"
             />

             <section className="">
                 <h1 className="p-24-semibold text-dark-100 mb-3">
                   Manage Created Trips
                 </h1>

                 <div className="trip-grid">
                    {allTrips.data.length ? allTrips.data.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
                        <TripCard 
                        key={id}
                        id={id.toString()}
                        name={name}
                        imageUrl={images[0]}  
                        location={itinerary?.[0]?.location ?? ''}
                        tags={[interests, travelStyle]}
                        price={estimatedPrice}
                    />
                            )) :  (
                  <div className="flex flex-col gap-2 w-full justify-center">
                        <p className="text-sm font-semibold text-red-400">No Trips Avalable!</p>
                        <p className="text-primary-100 text-xs">No worries reload and try again!</p>
                  </div>
                  )}
                 </div>
                     {allTrips.meta?.totalPage > 1 && <Pagination page={page} urlParamName={urlParamName} totalPages={allTrips.meta?.totalPage}/>}
             </section>
        </main>
    )
}

 export default Trips