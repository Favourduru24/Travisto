'use client'
import { Header, MapBox } from '@/app/components'
import { getAllUsers } from '@/app/service/trip-service'
import Image from 'next/image'
import { useEffect, useState } from 'react'


const AllUser = () => {

    const [allUsers, setAllUsers] = useState<any[]>([])
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

  useEffect(() => {
          const fetchAllTrips = async () => {
            const res = await getAllUsers();
            setAllUsers(res);
          };
      
          fetchAllTrips();
        }, []);
  
        console.log({allUsers})

   return (
    <section className="all-users wrapper">
       <Header
               title='Manage Users'
               description="Filter sort, and access detailed user profiles"
             />
             <section className="overflow-x-auto px-5 sm:px-10 2xl:px-0">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left">User ID</th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Username</th>
              <th className="min-w-[150px] py-3 text-left">Email</th>
              <th className="min-w-[100px] py-3 text-left">Created</th>
              <th className="min-w-[100px] py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {allUsers && allUsers.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No allUsers found.
                </td>
              </tr>
            ) : (
              <>
                {allUsers &&
                  allUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="p-regular-14 lg:p-regular-16 border-b hover:text-white cursor-pointer hover:bg-primary-100 p-1"
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[250px] py-4 font-semibold p-2">{user.id}</td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4 flex items-center gap-1">
                        <Image src={user?.profileUrl} width={24} height={24} alt={user?.username} className="size-10 rounded-full aspect-square"/>
                        {user.username}
                 
                      </td>
                      <td className="min-w-[150px] py-4 truncate px-2">{user.email}</td>
                      <td className="min-w-[100px] py-4 truncate text-sm">
                        {user.createdAt}
                      </td>
                      <td className={`min-w-[100px] py-4 text-right p-2 font-semibold text-sm ${user.status === 'user' ? "text-pink-500"  : user.status === 'admin' ? 'text-purple-500' : "text-gray-500"}`}>
                        <p className={`${user.status === 'agent' ? "text-pink-500"  : user.status === 'user' ? 'text-gray-500' : "text-green-500"}`}>{user.status}</p>
                      </td>                        
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
            {/* <MapBox/> */}
               
    </section>
   )
}

export default AllUser