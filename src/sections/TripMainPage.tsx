 'use client'
 import {Header, TripCard} from "@/app/components"
 import {allTrips} from "@/app/constants"
import { getAllTrips } from "@/app/service/trip-service"
 import {useState, useEffect} from "react"

const Trips = () => {

    const [Alltrip, setAllTrip] = useState<any[]>([])

    useEffect(() => {
        const fetchAllTrips = async () => {
          const res = await getAllTrips();
          setAllTrip(res);
        };
    
        fetchAllTrips();
      }, []);

      console.log({Alltrip})
    
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
                    {Alltrip.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
                        <TripCard 
                        key={id}
                        id={id.toString()}
                        name={name}
                        imageUrl={images[0]}  
                        location={itinerary?.[0]?.location ?? ''}
                        tags={[interests, travelStyle]}
                        price={estimatedPrice}
                    />
                            ))}
                 </div>
             </section>
        </main>
    )
}

 export default Trips