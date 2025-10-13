"use client"

import { getTripById } from '@/app/service/trip-service'
import { useEffect, useState } from 'react'

const TripsDetailPage = ({id}: any) => {

    const [tripDetail, setTripDetail] = useState<any[]>([])


    useEffect(() => {
       if(!id) return

       const fetchTripDetail = async () => {
         const res = await getTripById(id)
         setTripDetail(res)
       }

       fetchTripDetail()
    }, [id])

    
    console.log({id})
    console.log({tripDetail})

  return (
    <div className="wrapper">
      TripsDetailPage
    </div>
  )
}

export default TripsDetailPage