'use client'
import { Header, TripCard} from '@/app/components'
import StatCard from '@/app/components/StatCard'
import {useAuthStore} from '@/app/store'
import {allTrips} from "@/app/constants"
import {useState, useEffect} from 'react'
import { getUserTrips } from '@/app/service/trip-service'

const Dashboard = () => {

   const dashboardStat = {
      totalUsers: 12450,
      usersJoined: {
         currentMonth: 218, lastMonth: 176
      },
      totalTrips: 3218,
      tripCreated: {currentMonth: 150, lastMonth: 250},
      userRole: {total: 62, currentMonth: 25, lastMonth: 15}
   }

   const {totalUsers, usersJoined, totalTrips, tripCreated, userRole} =  dashboardStat
   const {user} = useAuthStore();
   const [userTrip, setUserTrip] = useState<any[]>([])

  useEffect(() => {
      if (!user) return;
  
      const fetchTrips = async () => {
        const res = await getUserTrips(user.userId);
        setUserTrip(res);
      };
  
      fetchTrips();
    }, [user]);
  
      console.log({userTrip})

  return (
    <div className="dashnoard wrapper">
      <Header
        title={`Welcome ${user?.username}`}
        description="Track activity, trends and popular destinations in real time"
      />
         <section className="flex flex-col gap-6">
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <StatCard 
                headerTitle="Total Users"
                total={totalUsers}
                currentMonthCount={usersJoined.currentMonth}
                lastMonthCount={usersJoined.lastMonth}
                /> 
              <StatCard 
                headerTitle="Total Trip"
                total={totalTrips}
                currentMonthCount={tripCreated.currentMonth}
                lastMonthCount={tripCreated.lastMonth}
                /> 
              <StatCard 
                headerTitle="Active Users"
                total={userRole.total}
                currentMonthCount={userRole.currentMonth}
                lastMonthCount={userRole.lastMonth}
                /> 
          </div>

         <section className="container">
                  <h1 className="text-xl font-semibold text-dark-100 my-1">Created Trips</h1>

                <div className="trip-grid">
                 {allTrips.length > 0 ? allTrips.slice(0, 4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
                  <TripCard 
                   key={id}
                   id={id.toString()}
                   name={name}
                   imageUrl={imageUrls[0]}  
                   location={itinerary?.[0]?.location ?? ''}
                   tags={tags}
                   price={estimatedPrice}
                       />
                 )) : (
                    <p>No Trip For Now!</p>
                 )}
                </div>
         </section>
         </section>
      
    </div>
  )
}

export default Dashboard