// import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import React from 'react'

// const CheckOutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         if (!stripe || !elements) return;

//         const {error: submitError} = await elements.submit()
//         if (submitError) return;

//         const res = await fetch('/api/create-intent', {
//             method: "POST",
//             body: JSON.stringify({
//                 amount: 58
//             })
//         })

//         const secretKey = await res.json();

//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const {error} = await stripe.confirmPayment({
//             clientSecret: secretKey,
//             elements,
//             confirmParams: {
//                 return_url: "http://localhost:3000/",
//             },
//         })
//     }

//     return (
//         <div className='flex justify-center items-center p-5'>
//             <div className='w-[80%]'>
//                 <form onSubmit={handleSubmit}>
//                     <PaymentElement />
//                     <div className='flex justify-center items-center'>
//                         <button
//                             className='bg-yellow-400 w-[50%] mt-4 p-2 rounded-md hover:bg-yellow-500 transition-all'
//                             type='submit' 
//                             disabled={!stripe || !elements}
//                         >
//                             Pay
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CheckOutForm

//Ned to take a look later