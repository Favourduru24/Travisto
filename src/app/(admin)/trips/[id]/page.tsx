import TripsDetailPage from "@/sections/TripsDetailPage"

const Page = async (props: any) => {

 const searchParams = await props?.searchParams
 const {id}: any = await props.params

 const page = Number(searchParams?.page) || 1


  return (
    <TripsDetailPage id={id} page={page}/>
     )
    }

export default Page