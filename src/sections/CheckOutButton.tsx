'use client'
import { useEffect } from "react"
import {loadStripe} from "@stripe/stripe-js"
import { checkoutOrder } from "@/lib/action/order.action"

 loadStripe('pk_test_51QnWXkPRigtMn8vR0aibTtxOFTUoCICH5RnwzxycTeO3iylsaDolHlW87xlAqsJkl9gI09czeiIIa5Ul3oa8nrf300At9sUTln')

const CheckOutButton = ({trip, userId}) => {

    useEffect(() => {

         const query = new URLSearchParams(window.location.search)

          if(query.get('success')) {
             console.log('Order placed! You will get an email confirmation.')
          }
           
           if(query.get('canceled')){
            console.log('order canceled.')
           }

       },[])

       const onCheckout = async () => {
            console.log('Checked out')
          const order = {
             tripName: trip.name,
             tripId: trip.id,
             price: trip.estimatedPrice,
             buyerId: userId
         }

          await checkoutOrder(order)
     }

  return (
    <footer className="w-full">
        <button className="button-class !h-12 w-full cursor-pointer" onClick={onCheckout}>
            <p className="text-white text-sm font-semibold px-1">Pay and join trips</p>
            <span className="bg-white py-1 px-2.5 w-fit rounded-[20px] text-dark-100 text-sm font-semibold">{trip.estimatedPrice}</span>
        </button>
    </footer>
  )
}

export default CheckOutButton