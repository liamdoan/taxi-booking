'use client';

import React from 'react';
import CarOptions from '@/app/client-app/data/CarOptions';
import Image from 'next/image';
import { useTravelingRouteDataContext } from '@/app/shared/context/TravelingRouteDataContext';
import { useSelectedCarContext } from '@/app/shared/context/SelectedCarContext';

const Cars = () => {
    const { selectedCar, setSelectedCar, setSelectedCategory } = useSelectedCarContext();
    const { travelingRouteData } = useTravelingRouteDataContext();

    const getCost = (rate: any) => {
        if (!travelingRouteData) return;

        const distanceInKilometer = travelingRouteData.routes[0].distance * 0.001;
        const actualCost = rate * distanceInKilometer;
        const roundedCost = Math.round(actualCost * 10) / 10;

        return roundedCost;
    };

    return (
        <div className="mt-5 px-1">
            <h2 className="text-[var(--text-normal)]">
                Car select&nbsp;<span className="text-red-500">*</span>
            </h2>
            <div className="flex flex-wrap justify-around items-center">
                {CarOptions.map((item) => (
                    <div key={item.id} className="m-2">
                        <div
                            className={`
                                relative
                                min-w-[6rem] min-h-[4rem] max-w-[8rem] max-h-[6rem] 
                                aspect-[5/3] flex justify-center items-center overflow-hidden
                                bg-white m-1 p-[3px] border-[1px] rounded-md
                                hover:border-yellow-400 cursor-pointer transition-all
                                ${item.id == selectedCar && 'border-yellow-400 border-[3px]'}
                            `}
                            onClick={() => {
                                setSelectedCar(item.id);
                                setSelectedCategory(item.category);
                            }}
                        >
                            <div
                                className={`
                                absolute inset-0 bg-black
                                ${item.id == selectedCar ? 'bg-opacity-0' : 'bg-opacity-50'}
                                transition-all
                            `}
                            ></div>
                            <Image
                                src={item.img}
                                alt={item.category}
                                width={400}
                                height={180}
                                style={{ width: '100%', height: 'auto' }}
                                loading="lazy"
                            />
                        </div>
                        <p
                            className={`
                            text-[0.8rem] text-[var(--text-normal)] px-[4px] pt-2 transition-all
                            ${item.id == selectedCar && 'text-yellow-400'}
                        `}
                        >
                            {item.category}
                            {travelingRouteData && (
                                <span className="float-right line-through opacity-50">{getCost(item.chargeRate)}€</span>
                            )}
                        </p>
                    </div>
                ))}
            </div>
            <p className="text-yellow-500 text-[0.7rem] italic mt-4 mb-2 text-center opacity-95">
                * Comfort and Luxury options are very limited.
            </p>
            <p className="text-yellow-500 text-[0.7rem] italic mt-2 text-center opacity-95">
                All the pricing is handled by us.
            </p>
        </div>
    );
};

export default Cars;
