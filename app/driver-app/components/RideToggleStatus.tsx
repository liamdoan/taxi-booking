import React, { useState } from 'react';
import { RideInfo } from '@/app/shared/utils/types';
import LoadingBar from '@/app/shared/components/LoadingBar';

const RideToggleStatus: React.FC<{ rideInfo: RideInfo }> = ({ rideInfo }) => {
    const [localRideInfo, setLocalRideInfo] = useState<RideInfo>(rideInfo);

    const [loadingFetchReceived, setLoadingFetchReceived] = useState(false);
    const [successReceivedMessage, setSuccessReceivedMessage] = useState(false);
    const [failReceivedMessage, setFailReceivedMessage] = useState(false);

    const [loadingFetchFinished, setLoadingFetchFinished] = useState(false);
    const [successFinishedMessage, setSuccessFinishedMessage] = useState(false);
    const [failFinishedMessage, setFailFinishedMessage] = useState(false);

    const toggleRideReceived = async (id: any) => {
        setLoadingFetchReceived(true);
        setSuccessReceivedMessage(false);
        setFailReceivedMessage(false);

        // avoid spamming database
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            await delay(1000);

            const res = await fetch(`/api/ride-info/update/receive/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to toogle ride-received status.');
            }

            const data = await res.json();

            setSuccessReceivedMessage(true);
            setTimeout(() => setSuccessReceivedMessage(false), 3000);

            const updatedRideInfo =
                localRideInfo._id === id
                    ? {
                          ...localRideInfo,
                          isRideReceived: data.updatedRideReceived.isRideReceived,
                          isRideFinished: data.updatedRideReceived.isRideReceived
                              ? data.updatedRideReceived.isRideFinished
                              : false,
                      }
                    : localRideInfo;

            setLocalRideInfo(updatedRideInfo);
        } catch (error) {
            console.error(error);

            setFailReceivedMessage(true);
            setTimeout(() => setFailReceivedMessage(false), 3000);
        } finally {
            setLoadingFetchReceived(false);
        }
    };

    const toggleRideFinished = async (id: any) => {
        setLoadingFetchFinished(true);
        setSuccessFinishedMessage(false);
        setFailFinishedMessage(false);

        // avoid spamming database
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            await delay(1000);

            const res = await fetch(`/api/ride-info/update/finish/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to toggle ride-finished status.');
            }

            const data = await res.json();

            setSuccessFinishedMessage(true);
            setTimeout(() => setSuccessFinishedMessage(false), 3000);

            const updateRideInfos =
                localRideInfo._id === id
                    ? {
                          ...localRideInfo,
                          isRideFinished: data.updatedRideFinished.isRideFinished,
                      }
                    : localRideInfo;

            setLocalRideInfo(updateRideInfos);
        } catch (error) {
            console.error(error);

            setFailFinishedMessage(true);
            setTimeout(() => setFailFinishedMessage(false), 3000);
        } finally {
            setLoadingFetchFinished(false);
        }
    };

    return (
        <div className="flex flex-wrap justify-around">
            <div className="w-[200px] mx-1 mb-1">
                <label
                    htmlFor={`ride-received-checkbox-${localRideInfo._id}`}
                    className="
                        mx-4
                        font-bold text-yellow-400
                        flex flex-row justify-between items-center
                        hover:cursor-pointer
                        text-[1rem]
                        relative
                    "
                >
                    Ride received
                    <input
                        id={`ride-received-checkbox-${localRideInfo._id}`}
                        type="checkbox"
                        checked={localRideInfo.isRideReceived}
                        onChange={() => toggleRideReceived(localRideInfo._id)}
                        className="
                            w-[30px] h-[30px] ml-4 my-1 hover:cursor-pointer
                            appearance-none
                            border-2 border-yellow-400 rounded-[50%]
                            peer
                        "
                    />
                    <div
                        className="
                        absolute
                        right-0 mx-[5px] my-1
                        w-[20px] h-[20px]
                        peer-checked:rounded-[50%]
                        peer-checked:bg-green-500
                        "
                    ></div>
                </label>
                {(loadingFetchReceived || successReceivedMessage || failReceivedMessage) && (
                    <div
                        className="
                            my-1 mx-4
                            flex justify-center items-center
                        "
                    >
                        {loadingFetchReceived && <LoadingBar />}
                        {successReceivedMessage && <span className="text-green-500">Update Succeeded!</span>}
                        {failReceivedMessage && <span className="text-red-700">Update Failed!</span>}
                    </div>
                )}
            </div>
            <div className="w-[200px] mx-1 mt-1">
                <label
                    htmlFor={`ride-finished-checkbox-${localRideInfo._id}`}
                    className={`
                        mx-4
                        font-bold
                        ${!localRideInfo.isRideReceived ? 'text-gray-600' : 'text-yellow-400'}
                        flex flex-row justify-between items-center
                        ${!localRideInfo.isRideReceived ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'}
                        text-[1rem]
                        relative
                    `}
                >
                    Ride finished
                    <input
                        id={`ride-finished-checkbox-${localRideInfo._id}`}
                        type="checkbox"
                        checked={localRideInfo.isRideFinished}
                        onChange={() => toggleRideFinished(localRideInfo._id)}
                        className="
                            w-[30px] h-[30px] ml-4 my-1 hover:cursor-pointer
                            appearance-none
                            border-2 border-yellow-400 rounded-[50%]
                            disabled:cursor-not-allowed
                            peer
                        "
                        disabled={!localRideInfo.isRideReceived}
                    />
                    <div
                        className="
                        absolute
                        right-0 mx-[5px] my-1
                        w-[20px] h-[20px]
                        peer-checked:rounded-[50%]
                        peer-checked:bg-green-500
                        "
                    ></div>
                </label>
                {(loadingFetchFinished || successFinishedMessage || failFinishedMessage) && (
                    <div
                        className="
                        my-1 mx-4
                        flex justify-center items-center
                        "
                    >
                        {loadingFetchFinished && <LoadingBar />}
                        {successFinishedMessage && <span className="text-green-500">Update Succeeded!</span>}
                        {failFinishedMessage && <span className="text-red-700">Update Failed!</span>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RideToggleStatus;
