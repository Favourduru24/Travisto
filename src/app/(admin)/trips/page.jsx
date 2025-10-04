 import {Header, TripCard} from "@/app/components"
 import {allTrips} from "@/app/constants"

const Trips = () => {
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
        </main>
    )
}

 export default Trips