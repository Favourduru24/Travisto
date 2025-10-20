 import RootPage from '@/sections/RootPage'
import React from 'react'
 
 const Home = async (props: any) => {
     const searchParams = await props?.searchParams

    const page = Number(searchParams?.page) || 1

    
   return (
     <RootPage page={page}  />
   )
 }
 
 export default Home