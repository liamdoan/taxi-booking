'use client';

import CarOptions from '@/app/data/CarOptions'
import Image from 'next/image'
import React, { useState } from 'react'

const Cars = () => {
    const [selectedCar, setSelecedCar] = useState<any>();
    return (
        <div className='mt-5'>
            <h2>Car select</h2>
            <div className='grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4'>
                {CarOptions.map((item) => (
                    <div 
                        key={item.id} 
                        className={`
                            bg-white m-3 p-2 border-[1px] rounded-md
                            hover:border-yellow-400 cursor-pointer transition-all
                            ${item.id == selectedCar && 'border-yellow-400 border-[3px]'}
                        `}
                        onClick={() => setSelecedCar(item.id)}
                    >
                        <Image
                            src={item.img}
                            alt={item.category}
                            width={400}
                            height={180}
                            style={{ width: '100%', height: 'auto' }}
                            loading="lazy"
                        />
                        <p className='text-[0.8rem]'>
                            {item.category}
                            <span className='float-right'>
                                {item.charges*10}€
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cars
