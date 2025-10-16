'use client'
import { Header, TripCard} from '@/app/components'
import StatCard from '@/app/components/StatCard'
import {useAuthStore} from '@/app/store'
import {allTrips} from "@/app/constants"
import {useState, useEffect} from 'react'
import { getUserTrips } from '@/app/service/trip-service'
import { Chart } from '@/app/components/Chart'
import Image from 'next/image'
import { getDashboardStats, getTripsGrowth, getUserGrowth } from '@/app/service/dashboard-service'

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

   const {user} = useAuthStore();
   const [userTrip, setUserTrip] = useState<any[]>([])
   const [dashsStat, setDashStat] = useState([])
   const [usersGrowth, setUserGrowth] = useState([])
   const [tripsGrowth, setTripGrowth] = useState([])
   
   const {totalUsers, usersJoined, totalTrips, tripsCreated} =  dashsStat || {}
   useEffect(() => {
  const fetchData = async () => {
    try {
      const [stats, users, trips] = await Promise.all([
        getDashboardStats(),
        getUserGrowth(),
        getTripsGrowth(),
      ]);

      setDashStat(stats);
      setUserGrowth(users);
      setTripGrowth(trips);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  fetchData();
}, []);

   console.log({dashsStat, usersGrowth, tripsGrowth})

   const users = [
        {
        id: 1,
        username: 'Duru Pristine',
        email: 'durupristine@gmail.com',
        status: 'user',
        time: 'May 2nd 2025',
        profileUrl: '/assets/images/david.webp'
    },
        {
        id: 2,
        username: 'Hart Kelvin',
        email: 'kelvinhart@gmail.com',
        status: 'agent',
        time: 'May 22nd 2025',
        profileUrl: '/assets/images/david.webp'
    },
        {
        id: 3,
        username: 'Duru Favour',
        email: 'durufavour@gmail.com',
        status: 'admin',
        time: 'May 3rd 2025',
        profileUrl: '/assets/images/david.webp'
    },
]
   const trips = [
        {
        id: 1,
        username: 'Duru Pristine',
        interests: 'Nightlife & Bars',
        status: 'user',
        time: 'May 2nd 2025',
        profileUrl: '/assets/images/david.webp'
    },
        {
        id: 2,
        username: 'Hart Kelvin',
        interests: 'Hiking, Nature etc',
        status: 'agent',
        time: 'May 22nd 2025',
        profileUrl: '/assets/images/david.webp'
    },
        {
        id: 3,
        username: 'Duru Favour',
        interests: 'Historical & Art',
        status: 'admin',
        time: 'May 3rd 2025',
        profileUrl: '/assets/images/david.webp'
    },
]

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
                currentMonthCount={usersJoined?.currentMonth}
                lastMonthCount={usersJoined?.lastMonth}
                /> 
              <StatCard 
                headerTitle="Total Trip"
                total={totalTrips}
                currentMonthCount={tripsCreated?.currentMonth}
                lastMonthCount={tripsCreated?.lastMonth}
                /> 
              {/* <StatCard 
                headerTitle="Active Users"
                total={userRole.total}
                currentMonthCount={userRole.currentMonth}
                lastMonthCount={userRole.lastMonth}
                />  */}
          </div>

         <section className="container">
                  <h1 className="text-xl font-semibold text-dark-100 my-1">Created Trips</h1>

                <div className="trip-grid">
                 {/* {allTrips.slice(0, 4)?.map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
                  <TripCard 
                   key={id}
                   id={id.toString()}
                   name={name}
                   imageUrl={imageUrls[0]}  
                   location={itinerary?.[0]?.location ?? ''}
                   tags={tags}
                   price={estimatedPrice}
                       />
                 ))} */}
                 {userTrip.slice(0, 4)?.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
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

         <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
            <Chart data={dashsStat?.tripsByTravelStyle} keys="travelStyle" num="count"/>
            <Chart data={tripsGrowth} keys="day" num="count"/>
            {/* <Chart/> */}
         </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4 mb-3">
               <div className='flex flex-col'>
                  <h2 className="text-sm md:text-lg text-dark-100 font-normal my-4 font-semibold">Latest sign up users</h2>
                 <table className="w-full border-collapse border-t">
                    <thead>
                      <tr className="p-medium-14 border-b text-grey-500">
                        <th className="min-w-[250px] py-3 text-left">Username</th>
                        <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Trip Created</th>
                         
                      </tr>
                    </thead>
                    <tbody>
                      {users && users.length === 0 ? (
                        <tr className="border-b">
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {users &&
                            users.map((user) => (
                              <tr
                                key={user.id}
                                className="p-regular-14 lg:p-regular-16 border-b hover:text-white cursor-pointer hover:bg-primary-100 p-1"
                                style={{ boxSizing: 'border-box' }}>
                                <td className="min-w-[200px] flex-1 py-4 pr-4 flex items-center gap-2 p-2">
                                  <Image src={user?.profileUrl} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/>
                                  {user.username}
                           
                                </td>
                                <td className="min-w-[250px] py-4 font-semibold p-2">{user.id}</td>
                                
                              </tr>
                            ))}
                        </>
                      )}
                    </tbody>
                  </table>
               </div>
          
                <div className='flex flex-col'>
                  <h2 className="text-sm md:text-lg text-dark-100 font-normal my-4 font-semibold">Trips based on interest</h2>
                  <table className="w-full border-collapse border-t">
                    <thead>
                      <tr className="p-medium-14 border-b text-grey-500">
                        <th className="min-w-[250px] py-3 text-left">Trips</th>
                        <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Interests</th>
                         
                      </tr>
                    </thead>
                    <tbody>
                      {trips && trips.length === 0 ? (
                        <tr className="border-b">
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            No trips found.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {trips &&
                            trips.map((user) => (
                              <tr
                                key={user.id}
                                className="p-regular-14 lg:p-regular-16 border-b hover:text-white cursor-pointer hover:bg-primary-100 p-1"
                                style={{ boxSizing: 'border-box' }}>
                                <td className="min-w-[200px] flex-1 py-4 pr-4 flex items-center gap-2 p-2">
                                  <Image src={user?.profileUrl} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/>
                                  {user.username}
                           
                                </td>
                                <td className="min-w-[250px] py-4 p-2 text-base">{user.interests}</td>
                                
                              </tr>
                            ))}
                        </>
                      )}
                    </tbody>
                  </table>
                  </div>
            </section>

         </section>
       </div>
  )
}

export default Dashboard