'use client';

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import CheckOutForm from '@/app/client-app/components/Payment/CheckOutForm';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const Payment = () => {
    const stripePromise = loadStripe(stripePublishableKey as string);

    const options: any = {
        // passing the client secret obtained from the server
        mode: 'payment',
        currency: 'eur',
        amount: 50,
      };

    return (
        <Elements stripe={stripePromise} options={options}>
            {/* <CheckOutForm /> */}
        </Elements>
    )
}

export default Payment