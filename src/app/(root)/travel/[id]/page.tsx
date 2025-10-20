import TravelDetailPage from "@/sections/TravelDetialPage"

const Page = async (props: any) => {

const {id}: any = await props.params
const searchParams = await props?.searchParams

const page = Number(searchParams?.page) || 1

  return (
    <TravelDetailPage id={id} page={page}/>
     )
    }

export default Page