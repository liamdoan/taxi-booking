'use client';

import React, { useEffect, useState } from 'react';
import Spinner from './components/Spinner';

const BASE_URL = "http://localhost:3000";

const Home = () => {
    const [rideInfos, setRideInfos] = useState<any>([]);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingFetchReceived, setLoadingFetchReceived] = useState<{ [key: string]: boolean }>({});;

    useEffect(() => {
        const getAllRides = async () => {
            try {
                const res = await fetch(`/api/ride-info/get`);

                if (res.ok) {
                    const data = await res.json();
                    setRideInfos(data);
                    setLoadingInitial(false)
                } else {
                    throw new Error('Something is wrong. Failed to fetch ride data.')
                }
            } catch (error) {
                console.error(error)
            }
        };
        
        const timer = setTimeout(()=> {
            getAllRides();
        }, 1000) 

        return () => clearTimeout(timer)
    }, []);

    const toggleRideReceived = async (id: any) => {
        setLoadingFetchReceived((prev) => ({ ...prev, [id]: true }));

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {

            await delay(4000);
            const res = await fetch(`/api/ride-info/update/receive/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!res.ok) {
                throw new Error('Failed to toogle ride-received status.')
            };

            const data = await res.json();
            console.log(data)

            const updatedRideInfos = rideInfos.map((rideInfo: any) =>
                rideInfo._id === id
                ? {
                    ...rideInfo,
                    isRideReceived: data.updatedRideReceived.isRideReceived,
                    isRideFinished: data.updatedRideReceived.isRideReceived ? data.updatedRideReceived.isRideFinished : false
                } : rideInfo
            )
            setRideInfos(updatedRideInfos);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFetchReceived((prev) => ({ ...prev, [id]: false }));
        }
    };

    const toggleRideFinished = async (id: any) => {
        try {
            const res = await fetch(`/api/ride-info/update/finish/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!res.ok) {
                throw new Error('Failed to toggle ride-finished status.');
            };

            const data = await res.json();
            console.log(data)

            const updateRideInfos = rideInfos.map((rideInfo: any) =>
                rideInfo._id === id
                ? {
                    ...rideInfo,
                    isRideFinished: data.updatedRideFinished.isRideFinished
                } : rideInfo
            )
            setRideInfos(updateRideInfos)
        } catch (error) {
            console.error(error);
        }
    };

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
                                    p-5 mb-2 mx-5
                                    text-white
                                "
                            >
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Pickup point:
                                    </p>
                                    <span className='col-span-2'>adasdasdasda asdasdasdasd asdasdasdasd asdasdasdas adsasdasd </span>
                                </div>
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Dropping point:
                                    </p>
                                    <span className='col-span-2'>{rideInfo.drop}</span>
                                </div>
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Distance:
                                    </p>
                                    <span className='col-span-2'>10km hard-coded</span>
                                </div>
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Estimated time:
                                    </p>
                                    <span className='col-span-2'>25mins hard-coded</span>
                                </div>
                                <div className='flex flex-wrap justify-around mt-4'>
                                    <div className='flex flex-wrap justify-between w-[200px] mx-2 my-3 py-3'>
                                        <label
                                            htmlFor={`ride-received-checkbox-${rideInfo._id}`}
                                            className='
                                                my-1 mx-4 
                                                font-bold text-yellow-400
                                                flex flex-row justify-center items-center
                                                hover:cursor-pointer
                                                relative
                                            '
                                        >
                                            Ride received
                                            <input
                                                id={`ride-received-checkbox-${rideInfo._id}`}
                                                type="checkbox"
                                                checked={rideInfo.isRideReceived}
                                                onChange={() => toggleRideReceived(rideInfo._id)}
                                                className='
                                                    w-[30px] h-[30px] mx-4 my-1 hover:cursor-pointer
                                                    appearance-none
                                                    border-2 border-yellow-400 rounded-[50%]
                                                    peer
                                                '
                                            />
                                            <div className='
                                                absolute
                                                right-0 mx-[22px] my-1
                                                w-[20px] h-[20px]
                                                peer-checked:rounded-[50%]
                                                peer-checked:bg-green-500
                                                '
                                            >
                                            </div>
                                        </label>
                                        {loadingFetchReceived[rideInfo._id] &&
                                            <div
                                            className='
                                                w-full
                                                my-1 mx-4
                                                flex justify-center items-center
                                                '
                                            >
                                                <Spinner width={32} height={32}/>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex flex-wrap justify-between w-[200px] mx-2 my-3 py-3'>
                                        <label
                                            htmlFor={`ride-finished-checkbox-${rideInfo._id}`}
                                            className={`
                                                my-1 mx-4 
                                                font-bold
                                                ${!rideInfo.isRideReceived ? 'text-gray-600' : 'text-yellow-400'}
                                                flex flex-row justify-center items-center
                                                ${!rideInfo.isRideReceived ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'}
                                                relative
                                            `}
                                        >
                                            Ride finished
                                            <input
                                                id={`ride-finished-checkbox-${rideInfo._id}`}
                                                type="checkbox"
                                                checked={rideInfo.isRideFinished}
                                                onChange={() => toggleRideFinished(rideInfo._id)}
                                                className='
                                                    w-[30px] h-[30px] mx-4 my-1 hover:cursor-pointer
                                                    appearance-none
                                                    border-2 border-yellow-400 rounded-[50%]
                                                    disabled:cursor-not-allowed
                                                    peer
                                                ' 
                                                disabled={!rideInfo.isRideReceived}
                                            />
                                            <div className='
                                                absolute
                                                right-0 mx-[21px] my-1
                                                w-[20px] h-[20px]
                                                peer-checked:rounded-[50%]
                                                peer-checked:bg-green-500
                                                '
                                            >
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default Home