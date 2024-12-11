import React, { useEffect } from 'react'
import { userTravelingRouteDataContext } from '@/app/shared/context/TravelingRouteDataContext';
import { useTimeDistanceContext } from '@/app/shared/context/TimeDistanceContext';

const TimeDistance = () => {
    const {travelingRouteData} = userTravelingRouteDataContext();
    const {
        formattedDistance,
        setFormattedDistance,
        formattedTime,
        setformattedTime
    } = useTimeDistanceContext();

    useEffect(() => {
        if (travelingRouteData) {
            //format distance
            const distanceInKilometer = travelingRouteData && travelingRouteData.routes[0].distance * 0.001;
            const roundDistanceInKilometer = Math.round(distanceInKilometer *10)/ 10;
            const roundDistanceInMeter = Math.round(distanceInKilometer * 1000);
            const formattedDistance = distanceInKilometer < 1
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

            setFormattedDistance(formattedDistance);
            setformattedTime(formattedTime)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [travelingRouteData, formattedDistance, formattedTime])

    return (
        <>
            <p>Distance: {formattedDistance}</p>
            <p>Time: {formattedTime}</p>
        </>
    )
}

export default TimeDistance
