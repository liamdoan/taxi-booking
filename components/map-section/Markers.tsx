import React from 'react'
import {Marker} from 'react-map-gl/maplibre';
import { useUserLocation } from '@/app/context/UserLocationContext';
import { useInputCoordsContext } from '@/app/context/InputCoordsContext';

const Markers = () => {
    const {userLocation} = useUserLocation();
    const {pickupCoordinate, dropCoordinate} = useInputCoordsContext();

    return (
        <div>
            {/* temporary disable, uncomment later when implementing "your localtion" function */}
            {/* {userLocation ?
                <Marker
                    longitude={userLocation.longitude}
                    latitude={userLocation.latitude}
                    anchor="bottom"
                    draggable
                >
                    <img
                        src="/location-pin-img/pin-red.png"
                        className='w-10 h-10'
                    />
                </Marker> //default marker, pinpoint user location
                : null
            } */}
            {pickupCoordinate && 
                <Marker
                longitude={pickupCoordinate.longitude}
                latitude={pickupCoordinate.latitude}
                anchor="bottom"
                draggable
                >
                    <img
                        src="/location-pin-img/pin-red.png"
                        className='w-10 h-10'
                        />
                </Marker>
            }
            {dropCoordinate && 
                <Marker
                longitude={dropCoordinate.longitude}
                latitude={dropCoordinate.latitude}
                anchor="bottom"
                draggable
                >
                    <img
                        src="/location-pin-img/pin-green.png"
                        className='w-10 h-10'
                        />
                </Marker>
            }
        </div>
    )
}

export default Markers
