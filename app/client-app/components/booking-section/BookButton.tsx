import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useSelectedCarContext } from '@/app/shared/context/SelectedCarContext';
import { useHasSelectedAddressContext } from '@/app/shared/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/shared/context/TravelingRouteDataContext';
import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import LoadingBar from '@/app/shared/components/LoadingBar';

const BookButton = () => {
    const [loading, setLoading] = useState(false);
    const [successBookMessage , setSuccessBookMessage] = useState(false);
    const [failedBookMessage , setFailedBookMessage] = useState(false);

    const {selectedCar} = useSelectedCarContext();
    const {
        hasSelectedPickupAddress,
        setHasSelectedPickupAddress,
        hasSelectedDropAddress,
        setHasSelectedDropAddress
    } = useHasSelectedAddressContext();
    const {hasFetchTravelingRouteDataSuccessfully} = useHasFetchTravelingRouteDataSuccessfullyContext();
    const {
        pickupAddressFromInput,
        setPickupAddressFromInput,
        dropAddressFromInput,
        setDropAddressFromInput
    } = useAddressNameContext();

    // const router = useRouter();

    const isButtonEnabled = selectedCar && hasSelectedPickupAddress && hasSelectedDropAddress && hasFetchTravelingRouteDataSuccessfully;

    const handleSubmit = async () => {
        const bookingData ={
            pickup: pickupAddressFromInput,
            drop: dropAddressFromInput
        }

        if (!isButtonEnabled || !hasSelectedPickupAddress || !hasSelectedDropAddress || !hasFetchTravelingRouteDataSuccessfully) return;

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            setLoading(true);

            await delay(3000);

            const res = await fetch('api/ride-info/send', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            if (!res.ok) {
                throw new Error('Failed to book ride');
            };

            setPickupAddressFromInput('');
            setDropAddressFromInput('');
            setHasSelectedPickupAddress(false);
            setHasSelectedDropAddress(false);

            setSuccessBookMessage(true);
            setTimeout(() => setSuccessBookMessage(false), 3000);

            const resData = await res.json();
            console.log("booking ok", resData)

        } catch (error) {
            console.error(error);

            setFailedBookMessage(true);
            setTimeout(() => setFailedBookMessage(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button 
                className={`
                    w-full p-2 mt-10 mb-3 rounded-md
                    ${!isButtonEnabled
                        ? 'bg-[var(--button-disabled)] cursor-not-allowed'
                        : 'bg-yellow-400 hover:bg-yellow-300 transition-all'
                    }
                `}
                // onClick={() => router.push('/client-app/payment')}
                onClick={handleSubmit}
                disabled={!isButtonEnabled}
            >
                Book
            </button>
            {loading && <LoadingBar/>}
            {successBookMessage &&
                <div className='text-center'>
                    <span className='text-green-500'>Your ride has been booked.</span>
                </div>
            }
            {failedBookMessage &&
                <div className='text-center'>
                    <span className='text-red-700'>Failed to book. Please try again!</span>
                </div>
            }
        </>
    )
}

export default BookButton
