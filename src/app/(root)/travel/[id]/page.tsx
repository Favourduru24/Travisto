import TravelDetailPage from "@/sections/TravelDetialPage"

const Page = async (props: any) => {

const {id}: any = await props.params

  return (
    <TravelDetailPage id={id}/>
     )
    }

export default Page