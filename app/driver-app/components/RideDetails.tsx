import React from 'react';
import { RideInfo } from '@/app/shared/utils/types';

const RideDetails: React.FC<{rideInfo: RideInfo}> = ({rideInfo}) => {
    const convert24To12HourFormat = (time24Hr: any) => {
        const splitTime = time24Hr.split(':');
        const hour24 = parseInt(splitTime[0], 10);
        const minutes = splitTime[1];

        let period = 'AM';
        let hour12 = hour24;

        if (hour24 === 0) {
            period = 'AM';
            hour12 = 12;
        } else if (hour24 === 12) {
            period = 'PM';
            hour12 = 12;
        } else if (hour24 > 12) {
            period = 'PM';
            hour12 = hour24 - 12;
        } else {
            period = 'AM';
        }

        const format12Hr = `${hour12}:${minutes} ${period}`;
        return format12Hr;
    };

    return (
        <>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Guests:</p>
                <span className='col-span-2'>{rideInfo.guestName}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Guest amount::</p>
                <span className='col-span-2'>{rideInfo.guestAmount}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Pickup point:</p>
                <span className='col-span-2'>{rideInfo.pickup}</span>
            </div>
            {/* <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Pickup day:</p>
                <span className='col-span-2'>{rideInfo.pickupDay}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Pickup date:</p>
                <span className='col-span-2'>{rideInfo.pickupDate}</span>
            </div> */}
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Pickup time:</p>
                <span className='col-span-2'>{convert24To12HourFormat(rideInfo.pickupTime)}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Dropping point:</p>
                <span className='col-span-2'>{rideInfo.drop}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Preferred car:</p>
                <span className='col-span-2'>{rideInfo.preferredCar}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Distance:</p>
                <span className='col-span-2'>{rideInfo.distance}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Estimated time:</p>
                <span className='col-span-2'>{rideInfo.estimatedTime}</span>
            </div>
        </>
    )
}

export default RideDetails
