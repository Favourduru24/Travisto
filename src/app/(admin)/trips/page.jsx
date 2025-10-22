import TripMainPage from '@/sections/TripMainPage'
const Page = async (props) => {

  const searchParams = await props?.searchParams

    const page = Number(searchParams?.page) || 1

    
  return (
    <TripMainPage page={page}/>
  )
}

export default Page