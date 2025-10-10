'use client'
import { ComboBox, Header } from "@/app/components" 
import { comboBoxItems, selectItems } from "@/app/constants"
import { formatKey } from "@/app/lib/utils"
import { useState, useEffect} from "react"
import Image from 'next/image'
import { ComboboxOption } from "@/app/components/ComboBox"
import {useAuthStore} from '@/app/store'
import { useRouter } from "next/navigation"
import {createTrip} from "@/app/service/trip-service"

const CreateTrip = () => {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [countries, setCountries] = useState<any>([])
    
    const [formData, setFormData] = useState<TripFormData>({
      country: countries[0]?.label || '',
      travelStyle: '',
      interest: '',
      budget: '',
      duration: 0,
      groupType: ''
    })
    const router = useRouter()
    const {user} = useAuthStore()

     useEffect(() => {
       
      const loader = async () => {

         const response = await fetch('https://restcountries.com/v3.1/all')

         const data = await response.json()

         setCountries(data)

         console.log(data)

         return countries.map((country: any) => ({
        label: country.flag + country.name.common,
        coordinates: country.lating,
        value: country.name.common,
        openStreetMap: country.maps?.openStreetMap
    }))
     }

     loader()

     }, [])

     const handleSubmit = async (e: any) => {
      e.preventDefault()

      try {
        
        const newTrip = await createTrip({data: {formData, userId: user.userId}})

         if(newTrip && newTrip?.success) {
          router.push('/dashboard')
         } else {
           throw new Error('Failed to create new trip.')
         }

      } catch(error) {
         console.error('Something went wrong to create trip.', error)
      }

     }

    const handleChange = (key: keyof TripFormData, value: string | number) => {
         setFormData({...formData, [key]: value})
    }
     
   return (
    <div className="flex flex-col gap-4 pb-10 wrapper">
     <Header 
       title="Add a new Trip"
       description="View and edit AI Generated travel plans"
     />

      <section className="mt-2.5 wrapper-md">
         <form className="trip-form">
          <div >
          <label htmlFor="country">
             Country
          </label>
           <ComboBox
              options={countries}
              placeholder="Select a Country"
              onSelect={(e: {value: string | undefined}) => {
                         if(e.value) {
                          handleChange('country', e.value)
                         }
                    }}
            />
          </div>
          <div>
            <label htmlFor="duration">
              Duration
            </label>
          <input
             id="duration"
             name="duration"
             placeholder="Enter a number of days (5, 12 ...3)"
             className="w-full h-[50px] px-3 py-2 border rounded-lg shadow-sm focus:outline-none  text-gray-500 placeholder:text-gray-100" onChange={(e) => handleChange('duration', Number(e.target.value))}
          />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
                <label htmlFor={key}>{formatKey(key)}</label>
                  <ComboBox
                    options={comboBoxItems[key].map((item) => ({value: item, label: item}))}
                    placeholder={`Select ${formatKey(key)}`}
                    onSelect={(e: {value: string | undefined | null}) => {
                         if(e.value) {
                          handleChange(key, e.value)
                         }
                    }}
                  />
            </div>
          ))}
           
           <div>
             <label htmlFor="location">
               Location on the world map
             </label>
           </div>
           <div className="bg-gray-200 h-px w-full"/>
             {error && (
                 <div className="error">
                   <p>{error}</p>
                 </div>
             )}

             <footer className="px-6 w-full">
               <button className="button-class !h-12 w-full cursor-pointer" onClick={handleSubmit}>
                  <Image src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} width={24} height={24} className={`size-5 ${loading ? 'animate-spin' : ''}`} alt="magic" />

                  <span className="p-16-semibold text-white">{loading ? 'Generating...' : 'Generate'}</span>
               </button>
             </footer>
         </form>
      </section>
    </div>
   )
}

 export default CreateTrip