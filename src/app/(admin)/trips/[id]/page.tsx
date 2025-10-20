import TripsDetailPage from "@/sections/TripsDetailPage"

const Page = async (props: any) => {

 const searchParams = await props?.searchParams
 const {id}: any = await props.params

 const page = Number(searchParams?.page) || 1

 const urlParamName = 'pages'

  return (
    <TripsDetailPage id={id} page={page} urlParamName={urlParamName}/>
     )
    }

export default Page