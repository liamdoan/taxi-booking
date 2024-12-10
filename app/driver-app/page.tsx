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

    return (
        <div className="bg-black flex flex-col justify-center items-center min-h-[100vh] pb-6">
            <h1 className='text-yellow-500 m-[2rem] text-[2rem]'>List of rides</h1>
            {loadingInitial 
                ? <Spinner width={64} height={64}/>
                : (
                    <>
                        {rideInfos.map((rideInfo: any) => (
                            <div
                                key={rideInfo._id}
                                className="
                                    min-w-[300px] max-w-[600px]
                                    border-2 border-yellow-400
                                    rounded-md
                                    pt-5 px-5 mb-2 mx-5
                                    text-white
                                "
                            >
                                <RideDetails rideInfo={rideInfo}/>
                                <RideToggleStatus rideInfo={rideInfo}/>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default Home
