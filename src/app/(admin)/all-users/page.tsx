import { Header } from '@/app/components'


const AllUser = () => {

    const user = {name: 'Adrian'}

   return (
    <section className="all-users wrapper">
       <Header
               title='Manage Users'
               description="Filter sort, and access detailed user profiles"
             />
            
               
    </section>
   )
}

export default AllUser