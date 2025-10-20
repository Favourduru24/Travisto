'use client'
import { Header, TripCard} from '@/app/components'
import StatCard from '@/app/components/StatCard'
import {useAuthStore} from '@/app/store'
// import {allTrips} from "@/app/constants"
import {useState, useEffect} from 'react'
import { getUserTrips, getAllTrips, getAllUsers} from '@/app/service/trip-service'
import { Chart } from '@/app/components/Chart'
import {Loader2} from 'lucide-react'
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
   const [userTrip, setUserTrip] = useState<{ data: any[], meta: any }>({ data: [], meta: {} })
   const [dashsStat, setDashStat] = useState([])
   const [usersGrowth, setUserGrowth] = useState([])
   const [tripsGrowth, setTripGrowth] = useState([])
   const [allTrips, setAllTrips] = useState<{ data: any[], meta: any }>({ data: [], meta: {} });
   const [allUsers, setAllUsers] = useState<any[]>([])
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string|null>(null)
   
   const {totalUsers, usersJoined, totalTrips, tripsCreated, userRole} =  dashsStat || {}

   useEffect(() => {

  const fetchData = async () => {
     const limit = 10
     setLoading(true)
     setError(null)

    try {
      const [stats, users, trips, allTrips, allUsers] = await Promise.all([ //
        getDashboardStats(),
        getUserGrowth(),
        getTripsGrowth(),
        getAllTrips({limit}),
        getAllUsers()
      ]);

      setDashStat(stats);
      setUserGrowth(users);
      setTripGrowth(trips);
      setAllTrips(allTrips)
      setAllUsers(allUsers)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      setError('Something went wrong fetching dashboard stats.')
      alert('Something went wrong fetching dashboard stats.')
    } finally {
      setLoading(false)
    }
  };

  fetchData();
}, []);


  useEffect(() => {
      if (!user) return;
  
      const fetchTrips = async () => {
        const res = await getUserTrips(user.userId);
        setUserTrip(res);
      };
  
      fetchTrips();
    }, [user]);
  

      const trip = allTrips.data.map((t) => ({
         imageUrl: t.images[0]?.url,
         name: t.name,
         travelStyle: t?.travelStyle
      }))

     const u = allUsers.map((u) => ({
       username: u.username,
       images: u.profileUrl,
       id: u.id
     }))

     
   if(loading) {
         return (
           <div className="flex inset-0 fixed items-center justify-center bg-gray-50/50 z-50">
               <Loader2 className="w-16 h-16 animate-spin text-primary-100"/>
           </div>
         )
       }

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
              <StatCard 
                headerTitle="Active Users"
                total={userRole?.total}
                currentMonthCount={userRole?.currentMonth}
                lastMonthCount={userRole?.lastMonth}
                /> 
          </div>
                <p className='font-medium text-red-400 text-lg'>{error}</p>

         <section className="container">
                  <h1 className="text-xl font-semibold text-dark-100 my-1">Created Trips</h1>

                <div className="trip-grid">
                  
                 {
                 userTrip?.data.length > 0 ?  userTrip.data?.slice(0, 3)?.map(({id, name, images, itinerary, interests, estimatedPrice, travelStyle}) => (
                  <TripCard 
                   key={id}
                   id={id.toString()}
                   name={name}
                   imageUrl={images[0]}  
                   location={itinerary?.[0]?.location ?? ''}
                   tags={[interests, travelStyle]}
                   price={estimatedPrice}
                       />
                 )) : 
                    allTrips?.data.slice(0, 3)?.map(({id, name, images, itinerary, interests, travelStyle, estimatedPrice}) => (
                  <TripCard 
                   key={id}
                   id={id.toString()}
                   name={name}
                   imageUrl={images[0]}  
                   location={itinerary?.[0]?.location ?? ''}
                   tags={[interests, travelStyle]}
                   price={estimatedPrice}
                       />
                 ))
                 }
                </div>
         </section>

         <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
            <Chart data={usersGrowth} keys="day" num="count" label="User Growth" title1={`Trending up by ${Math.floor(Math.random(10) * 10)}%  this month`} title2="Showing total visitors for the last 2 months"/>
            <Chart data={dashsStat?.tripsByTravelStyle} keys="travelStyle" num="count" label="Trip - Travel Style" title1={`Trending up by ${Math.floor(Math.random(10) * 10)}%  this month`} title2="Showing total visitors for the last 2 months"/>
         </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4 mb-3 overflow-hidden">
               <div className='flex flex-col'>
                  <h2 className="text-sm md:text-lg text-dark-100 my-4 font-semibold">Latest sign up users</h2>
                 <table className="w-full border-collapse border-t overflow-hidden">
                    <thead>
                      <tr className="p-medium-14 border-b text-grey-500">
                        <th className="min-w-[250px] py-3 text-left">Username</th>
                        <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Trip Created</th>
                         
                      </tr>
                    </thead>
                    <tbody>
                      {u && u.length === 0 ? (
                        <tr className="border-b">
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            No u found.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {u &&
                            u.map((user) => (
                              <tr
                                key={user.id}
                                className="p-regular-14 lg:p-regular-16 border-b hover:text-white cursor-pointer hover:bg-primary-100 p-1 text-gray-500"
                                style={{ boxSizing: 'border-box' }}>
                                <td className="min-w-[200px] flex-1 py-4 pr-4 flex items-center gap-2 p-2">
                                  <Image src={user?.images} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/>
                                  {user.username}
                           
                                </td>
                                <td className="min-w-[200px] py-4 font-semibold p-2">{user.id}</td>
                                
                              </tr>
                            ))}
                        </>
                      )}
                    </tbody>
                  </table>
               </div>
          
                <div className='flex flex-col'>
                  <h2 className="text-sm md:text-lg text-dark-100 my-4 font-semibold">Trips based on interest</h2>
                  <table className="w-full border-collapse border-t">
                    <thead>
                      <tr className="p-medium-14 border-b text-grey-500">
                        <th className="min-w-[250px] py-3 text-left">Trips</th>
                        <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Interests</th>
                         
                      </tr>
                    </thead>
                    <tbody>
                      {trip && trip.length === 0 ? (
                        <tr className="border-b">
                          <td colSpan={5} className="py-4 text-center text-gray-500">
                            No trip found.
                          </td>
                        </tr>
                      ) : (
                        <>
                          {trip &&
                            trip.slice(0, 3)?.map((t, index) => (
                              <tr
                                key={index}
                                className="p-regular-14 lg:p-regular-16 text-gray-500 border-b hover:text-white cursor-pointer hover:bg-primary-100 p-1 "
                                style={{ boxSizing: 'border-box' }}>
                                <td className="min-w-[200px] flex-1 py-4 pr-4 flex items-center gap-2 p-2 tru">
                                  <Image src={t?.imageUrl} width={24} height={24} alt={t?.name} className="size-10 rounded-full aspect-square"/>
                                  {t.name.slice(0, 25)}...
                           
                                </td>
                                <td className="min-w-[250px] py-4 p-2 text-base">{t.travelStyle}</td>
                                
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