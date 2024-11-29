import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelectedCarContext } from '@/app/context/SelectedCarContext';
import { useHasSelectedAddressContext } from '@/app/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/context/TravelingRouteDataContext';

const BookButton = () => {
    const {selectedCar} = useSelectedCarContext();
    const {hasSelectedAddress} = useHasSelectedAddressContext();
    const {hasFetchTravelingRouteDataSuccessfully} = useHasFetchTravelingRouteDataSuccessfullyContext();

    const router = useRouter();

    const isButtonEnabled = selectedCar && hasSelectedAddress && hasFetchTravelingRouteDataSuccessfully;

    return (
        <button 
            className={`
                w-full p-2 mt-10 rounded-md
                ${!isButtonEnabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-yellow-400'
                }
            `}
            onClick={() => router.push('/payment')}
            disabled={!isButtonEnabled}
        >
            Book
        </button>
    )
}

export default BookButton
