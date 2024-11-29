'use client';

import React from 'react';
import CarOptions from '@/app/data/CarOptions';
import Image from 'next/image';
import { userTravelingRouteDataContext } from '@/app/context/TravelingRouteDataContext';
import { useSelectedCarContext } from '@/app/context/SelectedCarContext';

const Cars = () => {
    const {selectedCar, setSelectedCar} = useSelectedCarContext();
    const {travelingRouteData} = userTravelingRouteDataContext();

    const getCost = (rate: any) => {
        if(!travelingRouteData) return;

        const distanceInKilometer = travelingRouteData.routes[0].distance * 0.001;
        const actualCost = rate * distanceInKilometer;
        const roundedCost = Math.round(actualCost * 10)/ 10;
        
        return roundedCost;
    }

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
                        onClick={() => setSelectedCar(item.id)}
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
                            {travelingRouteData && (
                                <span className='float-right'>
                                    {getCost(item.chargeRate)}€
                                </span>
                            )}
                        </p>    
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cars
