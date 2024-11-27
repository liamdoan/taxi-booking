'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useUserLocation } from '@/app/context/UserLocationContext';
import { useInputCoordsContext } from '@/app/context/InputCoordsContext'
import Map from 'react-map-gl/maplibre';
import Markers from './Markers';
import 'maplibre-gl/dist/maplibre-gl.css';

const mapTilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const CentrumHelsinkiDefaultCoords = {
    latitude: 60.170386,
    longitude: 24.940700
};

const MapLibre = () => {
    const {userLocation} = useUserLocation();
    const {pickupCoordinate, dropCoordinate} = useInputCoordsContext();

    const [longitude, setLongitude] = useState(CentrumHelsinkiDefaultCoords.longitude);
    const [latitude, setLatitude] = useState(CentrumHelsinkiDefaultCoords.latitude);

    const mapRef = useRef<any>();

    //Smooth transit to pickup point
    useEffect(() => {
        if(pickupCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [pickupCoordinate.longitude, pickupCoordinate.latitude],
                duration: 2000
            })
        }
    }, [pickupCoordinate])

    //Smooth transit to dropping point
    useEffect(() => {
        if(dropCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [dropCoordinate.longitude, dropCoordinate.latitude],
                duration: 2000
            })
        }
    }, [dropCoordinate])

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
                        ref={mapRef}
                        initialViewState={{
                            longitude: longitude,
                            latitude: latitude,
                            zoom:10
                        }}
                        style={{width: '100%', height: 600}}
                        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`}
                    >
                        <Markers />
                    </Map> 
            </div>
        </div>
    );
};
  

export default MapLibre
