'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '../shared/components/Spinner';
import RideDetails from './components/RideDetails';
import RideToggleStatus from './components/RideToggleStatus';

const BASE_URL = "http://localhost:3000";

const Home = () => {
    const [rideInfos, setRideInfos] = useState<any>([]);
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        const getAllRides = async () => {
            try {
                const res = await fetch(`/api/ride-info/get`);

                if (res.ok) {
                    const data = await res.json();
                    setRideInfos(data);
                    setLoadingInitial(false);
                } else {
                    throw new Error('Something is wrong. Failed to fetch ride data.')
                }
            } catch (error) {
                console.error(error)
            }
        };
        
        getAllRides();
    }, []);

    // filtered by pickup day
    const dayMinus1Rides = rideInfos.filter((ride: any) => ride.pickupDay.toLowerCase() === 'day -1');
    const day0Rides = rideInfos.filter((ride: any) => ride.pickupDay.toLowerCase() === 'day 0');
    const day1Rides = rideInfos.filter((ride: any) => ride.pickupDay.toLowerCase() === 'day 1');
    const day2Rides = rideInfos.filter((ride: any) => ride.pickupDay.toLowerCase() === 'day 2');

    return (
        <div className="bg-black min-h-[100vh] p-[3rem]">
            <h1 className='text-yellow-500 mb-[1rem] text-[2rem]'>List of rides</h1>
            <div className='flex flex-col'>
                {loadingInitial
                    ? <Spinner width={64} height={64}/>
                    : (
                        <>
                            <div className='text-[var(--text-normal)] mb-6'>
                                <h2 className='my-4 text-[1.5rem] text-gray-400 italic font-bold'>Day -1 (Mon, 18 Nov. 2024)</h2>
                                <div className='flex flex-wrap'>
                                    {dayMinus1Rides.length > 0 ? (
                                        dayMinus1Rides.map((rideInfo: any) => (
                                            <div
                                                key={rideInfo._id}
                                                className="
                                                    min-w-[300px] max-w-[600px]
                                                    border-2 border-yellow-400
                                                    rounded-md
                                                    pt-5 px-5 mb-2 mr-5
                                                    text-[var(--text-normal)]
                                                "
                                            >
                                                <RideDetails rideInfo={rideInfo}/>
                                                <RideToggleStatus rideInfo={rideInfo}/>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-gray-500 italic'>No rides have been booked for this day.</span>
                                    )}
                                </div>
                            </div>
                            <div className='text-[var(--text-normal)] mb-6'>
                                <h2 className='my-4 text-[1.5rem] text-gray-400 italic font-bold'>Day 0 (Tues, 19 Nov. 2024)</h2>
                                <div className='flex flex-wrap'>
                                    {day0Rides.length > 0 ? (
                                        day0Rides.map((rideInfo: any) => (
                                            <div
                                                key={rideInfo._id}
                                                className="
                                                    min-w-[300px] max-w-[600px]
                                                    border-2 border-yellow-400
                                                    rounded-md
                                                    pt-5 px-5 mb-2 mr-5
                                                    text-[var(--text-normal)]
                                                "
                                            >
                                                <RideDetails rideInfo={rideInfo}/>
                                                <RideToggleStatus rideInfo={rideInfo}/>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-gray-500 italic'>No rides have been booked for this day.</span>
                                    )}
                                    </div>
                            </div>
                            <div className='text-[var(--text-normal)] mb-6'>
                                <h2 className='my-4 text-[1.5rem] text-gray-400 italic font-bold'>Day 1 (Wed, 20 Nov. 2024)</h2>
                                <div className='flex flex-wrap'>
                                    {day1Rides.length > 0 ? (
                                        day1Rides.map((rideInfo: any) => (
                                            <div
                                                key={rideInfo._id}
                                                className="
                                                    min-w-[300px] max-w-[600px]
                                                    border-2 border-yellow-400
                                                    rounded-md
                                                    pt-5 px-5 mb-2 mr-5
                                                    text-[var(--text-normal)]
                                                "
                                            >
                                                <RideDetails rideInfo={rideInfo}/>
                                                <RideToggleStatus rideInfo={rideInfo}/>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-gray-500 italic'>No rides have been booked for this day.</span>
                                    )}
                                </div>
                            </div>
                            <div className='text-[var(--text-normal)] mb-6'>
                                <h2 className='my-4 text-[1.5rem] text-gray-400 italic font-bold'>Day 2 (Thurs, 21 Nov. 2024)</h2>
                                <div className='flex flex-wrap'>
                                    {day2Rides.length > 0 ? (
                                        day2Rides.map((rideInfo: any) => (
                                            <div
                                                key={rideInfo._id}
                                                className="
                                                    min-w-[300px] max-w-[600px]
                                                    border-2 border-yellow-400
                                                    rounded-md
                                                    pt-5 px-5 mb-2 mr-5
                                                    text-[var(--text-normal)]
                                                "
                                            >
                                                <RideDetails rideInfo={rideInfo}/>
                                                <RideToggleStatus rideInfo={rideInfo}/>
                                            </div>
                                        ))
                                    ) : (
                                        <span className='text-gray-500 italic'>No rides have been booked for this day.</span>
                                    )}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Home
