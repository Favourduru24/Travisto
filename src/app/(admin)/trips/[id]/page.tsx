import TripsDetailPage from "@/sections/TripsDetailPage"

const Page = async (props: any) => {

const {id}: any = await props.params

  return (
    <TripsDetailPage id={id}/>
     )
    }

export default Page