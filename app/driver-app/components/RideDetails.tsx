import React from 'react';
import { RideInfo } from '@/app/shared/utils/types';
import { convert24To12HourFormat } from '@/app/shared/utils/convert24To12HourFormat';
import RideToggleStatus from './RideToggleStatus';

const RideDetails: React.FC<{ sortedRides: any }> = ({ sortedRides }) => {
    return (
        <>
            <table className="w-full border-collapse text-white">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-400 bg-gray-600">Pickup time</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Pickup point</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Dropping point</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Guest amount</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Guests</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Preferred car</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Distance</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Estimate time</th>
                        <th className="p-2 border border-gray-400 bg-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedRides.map((rideInfo: RideInfo) => (
                        <tr key={rideInfo._id}>
                            <td className="p-2 border border-gray-400 text-center">
                                {convert24To12HourFormat(rideInfo.pickupTime)}
                            </td>
                            <td className="p-2 border border-gray-400">{rideInfo.pickup}</td>
                            <td className="p-2 border border-gray-400">{rideInfo.drop}</td>
                            <td className="p-2 border border-gray-400 text-center">{rideInfo.guestAmount}</td>
                            <td className="p-2 border border-gray-400">{rideInfo.guestName}</td>
                            <td className="p-2 border border-gray-400 text-center">{rideInfo.preferredCar}</td>
                            <td className="p-2 border border-gray-400 text-center">{rideInfo.distance}</td>
                            <td className="p-2 border border-gray-400 text-center">{rideInfo.estimatedTime}</td>
                            <td className="p-2 border border-gray-400">
                                <RideToggleStatus rideInfo={rideInfo} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default RideDetails;
