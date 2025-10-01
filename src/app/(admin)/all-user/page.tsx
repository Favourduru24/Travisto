import { Header } from '@/app/components'


const AllUser = () => {

    const user = {name: 'Adrian'}

   return (
    <section className="dashboard-wrapper">
       <Header
               title={`Welcome ${user?.name ?? 'Guest'}`}
               description="Check out our current user in real time"
             />
            
        Dashboard
    </section>
   )
}

export default AllUser