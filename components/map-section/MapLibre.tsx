'use client';

import { useUserLocation } from '@/app/context/UserLocationContext';
import React, { useEffect, useState } from 'react';
import Map, {Marker} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapTilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const CentrumHelsinkiDefaultCoords = {
    latitude: 60.170386,
    longitude: 24.940700
};

const MapLibre = () => {
    const {userLocation, setUserLocation} = useUserLocation();

    const [longitude, setLongitude] = useState(CentrumHelsinkiDefaultCoords.longitude);
    const [latitude, setLatitude] = useState(CentrumHelsinkiDefaultCoords.latitude);

    console.log("yooooo", userLocation)

    useEffect(() => {
        if (userLocation) {
            setLongitude(userLocation.longitude);
            setLatitude(userLocation.latitude);
        }
    }, [userLocation]);
    
      return (
        <div className='p-5'>
            <p>Map</p>
            <div className='overflow-hidden'>
                    <Map
                        initialViewState={{
                            longitude: longitude,
                            latitude: latitude,
                            zoom:10
                        }}
                        style={{width: '100%', height: 600}}
                        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`}
                    >
                        {userLocation ?
                            <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom" draggable>
                                <img 
                                    src="/location-pin-img/pin.png"
                                    className='w-10 h-10'
                                />
                            </Marker>
                            : null
                        }
                    </Map> 
            </div>
        </div>
    );
};
  

export default MapLibre
