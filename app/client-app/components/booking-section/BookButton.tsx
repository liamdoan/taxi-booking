import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import LoadingBar from '@/app/shared/components/LoadingBar';
import { useSelectedCarContext } from '@/app/shared/context/SelectedCarContext';
import { useHasSelectedAddressContext, useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import {
    useHasFetchTravelingRouteDataSuccessfullyContext,
    useTravelingRouteDataContext,
} from '@/app/shared/context/TravelingRouteDataContext';
import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import { useSelectedDayContext } from '@/app/shared/context/SelectedDayContext';
import { useSelectedTimeContext } from '@/app/shared/context/selectedTimeContext';
import { useTimeDistanceContext } from '@/app/shared/context/TimeDistanceContext';
import { useGuestAmountContext } from '@/app/shared/context/GuestAmountContext';
import { useCheckBoxContext } from '@/app/shared/context/CheckBoxContext';

const BookButton = () => {
    const [loading, setLoading] = useState(false);
    const [successBookMessage, setSuccessBookMessage] = useState(false);
    const [failedBookMessage, setFailedBookMessage] = useState(false);

    const { guestName, setGuestName, guestAmount } = useGuestAmountContext();
    const { selectedCar, setSelectedCar, selectedCategory } = useSelectedCarContext();
    const { setPickupCoordinate, setDropCoordinate } = useInputCoordsContext();
    const { formattedDistance, formattedTime } = useTimeDistanceContext();

    const { hasSelectedPickupAddress, setHasSelectedPickupAddress, hasSelectedDropAddress, setHasSelectedDropAddress } =
        useHasSelectedAddressContext();
    const { hasFetchTravelingRouteDataSuccessfully } = useHasFetchTravelingRouteDataSuccessfullyContext();
    const { pickupAddressFromInput, setPickupAddressFromInput, dropAddressFromInput, setDropAddressFromInput } =
        useAddressNameContext();
    const { selectedDayId, setSelectedDayId, selectedDayName, selectedDayDate } = useSelectedDayContext();
    const { setTickedPickupOptionCheckbox, setTickedDropOptionCheckbox } = useCheckBoxContext();
    const { setTravelingRouteData, setRouteCoordinates } = useTravelingRouteDataContext();

    const { convert12To24HourFormat } = useSelectedTimeContext();
    const formattedPickupTime = convert12To24HourFormat();

    // const router = useRouter();

    const isButtonEnabled = [
        guestName,
        selectedCar,
        hasSelectedPickupAddress,
        hasSelectedDropAddress,
        hasFetchTravelingRouteDataSuccessfully,
        pickupAddressFromInput,
        dropAddressFromInput,
        selectedDayId,
    ].every(Boolean);

    const handleSubmit = async () => {
        const bookingData = {
            guestName: guestName,
            guestAmount: guestAmount,
            pickup: pickupAddressFromInput,
            drop: dropAddressFromInput,
            pickupDay: selectedDayName,
            pickupDate: selectedDayDate,
            pickupTime: formattedPickupTime,
            distance: formattedDistance,
            estimatedTime: formattedTime,
            preferredCar: selectedCategory,
        };

        if (!isButtonEnabled) return;

        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        try {
            setLoading(true);

            await delay(1000);

            const res = await fetch('api/ride-info/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!res.ok) {
                throw new Error('Failed to book ride');
            }

            setGuestName('');
            setPickupAddressFromInput('');
            setDropAddressFromInput('');
            setPickupCoordinate(null);
            setDropCoordinate(null);
            setHasSelectedPickupAddress(false);
            setHasSelectedDropAddress(false);
            setTickedPickupOptionCheckbox('');
            setTickedDropOptionCheckbox('');
            setSelectedDayId(null);
            setSelectedCar(null);
            setTravelingRouteData(null);
            setRouteCoordinates([]);

            setSuccessBookMessage(true);
            setTimeout(() => setSuccessBookMessage(false), 3000);
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
                    ${
                        !isButtonEnabled
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
            {loading && <LoadingBar />}
            {successBookMessage && (
                <div className="text-center">
                    <span className="text-green-500">Your ride has been booked.</span>
                </div>
            )}
            {failedBookMessage && (
                <div className="text-center">
                    <span className="text-red-700">Failed to book. Please try again!</span>
                </div>
            )}
        </>
    );
};

export default BookButton;
