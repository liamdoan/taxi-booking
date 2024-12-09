'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '../shared/components/Spinner';

const BASE_URL = "http://localhost:3000";

const Home = () => {
    const [rideInfos, setRideInfos] = useState<any>([]);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const [loadingFetchReceived, setLoadingFetchReceived] = useState<{ [key: string]: boolean }>({});
    const [successReceivedMessage, setSuccessReceivedMessage] = useState<{ [key: string]: boolean }>({});
    const [failReceivedMessage, setFailReceivedMessage] = useState<{ [key: string]: boolean }>({});

    const [loadingFetchFinished, setLoadingFetchFinished] = useState<{ [key: string]: boolean }>({});
    const [successFinishedMessage, setSuccessFinishedMessage] = useState<{ [key: string]: boolean }>({});
    const [failFinishedMessage, setFailFinishedMessage] = useState<{ [key: string]: boolean }>({});

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
        
        getAllRides();
    }, []);

    const toggleRideReceived = async (id: any) => {
        setLoadingFetchReceived((prev) => ({ ...prev, [id]: true }));
        setSuccessReceivedMessage((prev) => ({ ...prev, [id]: false }));
        setFailReceivedMessage((prev) => ({ ...prev, [id]: false }));

        // avoid spamming database
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            await delay(1000);

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

            setSuccessReceivedMessage((prev) => ({ ...prev, [id]: true }));
            setTimeout(() => setSuccessReceivedMessage((prev) => ({ ...prev, [id]: false })), 3000);

            const updatedRideInfos = rideInfos.map((rideInfo: any) =>
                rideInfo._id === id
                ? {
                    ...rideInfo,
                    isRideReceived: data.updatedRideReceived.isRideReceived,
                    isRideFinished: data.updatedRideReceived.isRideReceived ? data.updatedRideReceived.isRideFinished : false
                } : rideInfo
            );

            setRideInfos(updatedRideInfos);
        } catch (error) {
            console.error(error);

            setFailReceivedMessage((prev) => ({ ...prev, [id]: true }));
            setTimeout(() => setFailReceivedMessage((prev) => ({ ...prev, [id]: false })), 3000);
        } finally {
            setLoadingFetchReceived((prev) => ({ ...prev, [id]: false }));
        }
    };

    const toggleRideFinished = async (id: any) => {
        setLoadingFetchFinished((prev) => ({ ...prev, [id]: true }));
        setSuccessFinishedMessage((prev) => ({ ...prev, [id]: false }));
        setFailFinishedMessage((prev) => ({ ...prev, [id]: false }));

        // avoid spamming database
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            await delay(1000);

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

            setSuccessFinishedMessage((prev) => ({ ...prev, [id]: true }));
            setTimeout(() => setSuccessFinishedMessage((prev) => ({ ...prev, [id]: false })), 3000);

            const updateRideInfos = rideInfos.map((rideInfo: any) =>
                rideInfo._id === id
                ? {
                    ...rideInfo,
                    isRideFinished: data.updatedRideFinished.isRideFinished
                } : rideInfo
            );

            setRideInfos(updateRideInfos);
        } catch (error) {
            console.error(error);

            setFailFinishedMessage((prev) => ({ ...prev, [id]: true }));
            setTimeout(() => setFailFinishedMessage((prev) => ({ ...prev, [id]: false })), 3000);
        } finally {
            setLoadingFetchFinished((prev) => ({ ...prev, [id]: false }));
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
                                    pt-5 px-5 mb-2 mx-5
                                    text-white
                                "
                            >
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Pickup point:
                                    </p>
                                    <span className='col-span-2'>{rideInfo.pickup}</span>
                                </div>
                                <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                                    <p className='col-span-1 font-bold'>
                                        Pickup time:
                                    </p>
                                    <span className='col-span-2'>10AM hardcoded</span>
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
                                    <div className='w-[200px] mx-2 my-3 py-1 min-h-[100px]'>
                                        <label
                                            htmlFor={`ride-received-checkbox-${rideInfo._id}`}
                                            className='
                                                mt-1 mb-3 mx-4
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
                                                    w-[30px] h-[30px] ml-4 my-1 hover:cursor-pointer
                                                    appearance-none
                                                    border-2 border-yellow-400 rounded-[50%]
                                                    peer
                                                '
                                            />
                                            <div className='
                                                absolute
                                                right-0 mx-[14px] my-1
                                                w-[20px] h-[20px]
                                                peer-checked:rounded-[50%]
                                                peer-checked:bg-green-500
                                                '
                                            >
                                            </div>
                                        </label>
                                        { (loadingFetchReceived[rideInfo._id] || successReceivedMessage[rideInfo._id] || failReceivedMessage[rideInfo._id]) &&
                                            <div
                                                className='
                                                    my-1 mx-4
                                                    flex justify-center items-center
                                                '
                                            >
                                                {loadingFetchReceived[rideInfo._id] &&
                                                    <Spinner width={32} height={32}/>
                                                }
                                                {successReceivedMessage[rideInfo._id] &&
                                                    <span className='text-green-500'>Update Succeeded!</span>
                                                }
                                                {failReceivedMessage[rideInfo._id] &&
                                                    <span className='text-red-700'>Update Failed!</span>
                                                }

                                            </div>
                                        }
                                    </div>
                                    <div className='w-[200px] mx-2 my-3 py-1 min-h-[100px]'>
                                        <label
                                            htmlFor={`ride-finished-checkbox-${rideInfo._id}`}
                                            className={`
                                                mt-1 mb-3 mx-4
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
                                                    w-[30px] h-[30px] ml-4 my-1 hover:cursor-pointer
                                                    appearance-none
                                                    border-2 border-yellow-400 rounded-[50%]
                                                    disabled:cursor-not-allowed
                                                    peer
                                                ' 
                                                disabled={!rideInfo.isRideReceived}
                                            />
                                            <div className='
                                                absolute
                                                right-0 mx-[16px] my-1
                                                w-[20px] h-[20px]
                                                peer-checked:rounded-[50%]
                                                peer-checked:bg-green-500
                                                '
                                            >
                                            </div>
                                        </label>
                                        { (loadingFetchFinished[rideInfo._id] || successFinishedMessage[rideInfo._id] || failFinishedMessage[rideInfo._id]) &&
                                            <div className='
                                                my-1 mx-4
                                                flex justify-center items-center
                                                '
                                                >
                                                {loadingFetchFinished[rideInfo._id] &&
                                                    <Spinner width={32} height={32}/>
                                                }
                                                {successFinishedMessage[rideInfo._id] &&
                                                    <span className='text-green-500'>Update Succeeded!</span>
                                                }
                                                {failFinishedMessage[rideInfo._id] &&
                                                    <span className='text-red-700'>Update Failed!</span>
                                                }
                                            </div>
                                        }
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