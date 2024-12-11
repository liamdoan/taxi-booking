'use client';

import React, { useState } from 'react'
import PaymentMethods from '@/app/client-app/data/PaymentMethods'
import Image from 'next/image';

const Payments = () => {
    const [selectedPayment, setSelecedPayment] = useState<any>();

    return (
        <div className='px-[4px] pt-[12px] mt-[10px] pb-[4px]'>
            <p className='text-[var(--text-normal)] text-[0.8rem]'>Available payment method</p>
            <div className='flex justify-around p-1'>   
                {PaymentMethods.map((item) => (
                    <div 
                        key={item.id}
                        className={`
                            border-[1px] rounded-md flex items-center mx-1
                            hover:border-yellow-400 cursor-pointer transition-all
                            ${item.id == selectedPayment && 'border-yellow-400 border-[3px]'}
                        `}
                        onClick={() => setSelecedPayment(item.id)}
                    >
                        <Image src={item.img} alt={item.category} width={50}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Payments
