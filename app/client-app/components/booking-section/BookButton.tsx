import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelectedCarContext } from '@/app/shared/context/SelectedCarContext';
import { useHasSelectedAddressContext } from '@/app/shared/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/shared/context/TravelingRouteDataContext';

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
                    ? 'bg-[var(--button-disabled)] cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-300 transition-all'
                }
            `}
            onClick={() => router.push('/client-app/payment')}
            disabled={!isButtonEnabled}
        >
            Book
        </button>
    )
}

export default BookButton
