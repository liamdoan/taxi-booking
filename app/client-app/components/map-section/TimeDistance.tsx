import React, { useEffect } from 'react'
import { userTravelingRouteDataContext } from '@/app/shared/context/TravelingRouteDataContext';

const TimeDistance = () => {
    const {travelingRouteData} = userTravelingRouteDataContext();
    
    //format distance
    const distanceInKilometer = travelingRouteData && travelingRouteData.routes[0].distance * 0.001;
    const roundDistanceInKilometer = Math.round(distanceInKilometer *10)/ 10;
    const roundDistanceInMeter = Math.round(distanceInKilometer * 1000);
    const formatDistance = distanceInKilometer < 1
        ? roundDistanceInMeter + 'm'
        : roundDistanceInKilometer + 'km'

    // Format time
    const rawDuration = travelingRouteData && travelingRouteData.routes[0].duration;
    const totalMinutes = Math.floor(rawDuration / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const minutesFormat = minutes === 1 ? `${minutes}min` : `${minutes}mins`
    const formattedTime = hours > 0 
        ? `${hours}h ${minutes}min` 
        : minutesFormat;

    return (
        <>
            <p>Distance: {formatDistance}</p>
            <p>Time: {formattedTime}</p>
        </>
    )
}

export default TimeDistance
