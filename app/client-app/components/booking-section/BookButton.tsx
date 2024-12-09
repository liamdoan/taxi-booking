import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useSelectedCarContext } from '@/app/shared/context/SelectedCarContext';
import { useHasSelectedAddressContext } from '@/app/shared/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/shared/context/TravelingRouteDataContext';
import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import LoadingBar from '@/app/shared/components/LoadingBar';

const BookButton = () => {
    const [loading, setLoading] = useState(false);

    const {selectedCar} = useSelectedCarContext();
    const {hasSelectedAddress} = useHasSelectedAddressContext();
    const {hasFetchTravelingRouteDataSuccessfully} = useHasFetchTravelingRouteDataSuccessfullyContext();
    const {
        pickupAddressFromInput,
        dropAddressFromInput,
    } = useAddressNameContext();

    // const router = useRouter();

    const isButtonEnabled = selectedCar && hasSelectedAddress && hasFetchTravelingRouteDataSuccessfully;

    const handleSubmit = async () => {
        const bookingData ={
            pickup: pickupAddressFromInput,
            drop: dropAddressFromInput
        }

        if (!isButtonEnabled || !hasSelectedAddress || !hasFetchTravelingRouteDataSuccessfully) return;

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
            })

            console.log(hasSelectedAddress)

            if (!res.ok) {
                throw new Error('Failed to book ride');
            };

            const resData = await res.json();
            console.log("booking ok", resData)
        } catch (error) {
            console.error(error);
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
        </>
    )
}

export default BookButton
