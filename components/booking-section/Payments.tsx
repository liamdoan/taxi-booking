'use client';

import React, { useState } from 'react'
import PaymentMethods from '@/app/data/PaymentMethods'

const Payments = () => {
    const [selectedPayment, setSelecedPayment] = useState<any>();

    return (
        <div className='bg-teal-300'>
            <p>Payment</p>
            <div className='flex justify-between p-2'>   
                {PaymentMethods.map((item) => (
                    <div 
                        key={item.id}
                        className={`
                            border-[1px] rounded-md flex items-center m-2
                            hover:border-yellow-400 cursor-pointer transition-all
                            ${item.id == selectedPayment && 'border-yellow-400 border-[3px]'}
                        `}
                        onClick={() => setSelecedPayment(item.id)}
                    >
                        <img src={item.img} alt={item.category} width={50}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Payments
