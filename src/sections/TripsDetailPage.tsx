"use client"

import { getTripById } from '@/app/service/trip-service'
import { useEffect, useState } from 'react'

const TripsDetailPage = ({id}) => {

    const [tripDetail, setTripDetail] = useState<any[]>([])

    useEffect(() => {
       const fetchTripDetail = async () => {
         const res = await getTripById(id)
         setTripDetail(res)
       }

       fetchTripDetail()
    }, [id])

    console.log({tripDetail})

  return (
    <div>TripsDetailPage</div>
  )
}

export default TripsDetailPage