import React from 'react';
import { RideInfo } from '@/app/shared/utils/types';

const RideDetails: React.FC<{rideInfo: RideInfo}> = ({rideInfo}) => {
    return (
        <>
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
                <span className='col-span-2'>{rideInfo.pickupTime}</span>
            </div>
            <div className='mx-1 my-2 grid grid-cols-3 gap-2'>
                <p className='col-span-1 font-bold'>Dropping point:</p>
                <span className='col-span-2'>{rideInfo.drop}</span>
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
