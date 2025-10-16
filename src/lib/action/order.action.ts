"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
// import Order from '../database/models/order.model';

export const checkoutOrder = async (order) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const cleanPrice = String(order.price).replace(/[^0-9.]/g, "") // remove $ and any non-numeric chars
const amount = Math.round(Number(cleanPrice) * 100)

  try {
    const session = await stripe.checkout.sessions.create({
       line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: amount,
            product_data: {
              name: order.tripName
            }
          },
          quantity: 1
        },
      ],
      metadata: {
        eventId: order.tripId,
        buyerId: order.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/`,
    });

    redirect(session.url)
  } catch (error) {
    throw error;
  }
}
