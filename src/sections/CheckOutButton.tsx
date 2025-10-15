'use client'
import { useEffect } from "react"
import {loadStripe} from "@stripe/stripe-js"
import { checkoutOrder } from "@/lib/action/order.action"

 loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

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
        <button className="button-class !h-12 w-full cursor-pointer" onSubmit={onCheckout}>
            <p className="text-white text-sm font-semibold px-1">Pay and join trips</p>
            <span className="bg-white py-1 px-2.5 w-fit rounded-[20px] text-dark-100 text-sm font-semibold">{trip.estimatedPrice} $1000</span>
        </button>
    </footer>
  )
}

export default CheckOutButton