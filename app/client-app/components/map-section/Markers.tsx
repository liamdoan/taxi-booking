import React from 'react';
import {Marker} from 'react-map-gl/maplibre';
import { useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import { useGetAddressData } from '@/app/shared/utils/getSingleAddressData';
// import { useUserLocation } from '@/app/shared/context/UserLocationContext';

const Markers = () => {
    // const {userLocation} = useUserLocation();
    const {pickupCoordinate, setPickupCoordinate, dropCoordinate, setDropCoordinate} = useInputCoordsContext();
    const { getAddressData } = useGetAddressData();

    const handleDragEnd = async (e: any, type: 'pickup' | 'drop') => {
        const newLatitude = e.lngLat.lat;
        const newLongitude = e.lngLat.lng;

        if (type === 'pickup') {
            setPickupCoordinate({
                latitude: newLatitude,
                longitude: newLongitude
            });
        } else {
            setDropCoordinate({
                latitude: newLatitude,
                longitude: newLongitude
            });
        }

        await getAddressData(newLatitude, newLongitude, type);
    };

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
                    onDragEnd={(e) => handleDragEnd(e, 'pickup')}
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
                    onDragEnd={(e) => handleDragEnd(e, 'drop')}
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
