'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useUserLocation } from '@/app/context/UserLocationContext';
import { useInputCoordsContext } from '@/app/context/InputCoordsContext';
import { decodePolyline } from '@/app/utils/decodePolyline';
import { transformCoordinates } from '@/app/utils/decodePolyline';
import Map from 'react-map-gl/maplibre';
import Markers from './Markers';
import MapTravelingRoutes from './MapTravelingRoutes';
import 'maplibre-gl/dist/maplibre-gl.css';
import { userTravelingRouteDataContext } from '@/app/context/TravelingRouteDataContext';

const mapTilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const CentrumHelsinkiDefaultCoords = {
    latitude: 60.170386,
    longitude: 24.940700
};

const MapLibre = () => {
    const {userLocation} = useUserLocation();
    const {pickupCoordinate, dropCoordinate} = useInputCoordsContext();
    const {travelingRouteData, setTravelingRouteData} = userTravelingRouteDataContext();

    const [routeCoordinates, setRouteCoordinates] = useState<any>([]);

    const [longitude, setLongitude] = useState(CentrumHelsinkiDefaultCoords.longitude);
    const [latitude, setLatitude] = useState(CentrumHelsinkiDefaultCoords.latitude)

    const mapRef = useRef<any>();

    //Calculate routes
    const getTravelingRouteData = async (coord1: any, coord2: any) => {
        try{
            const res = await fetch('/api/calculate-routing?pickup=' + coord1 + '&drop=' + coord2);
            const routeData = await res.json();

            const allRoutes = routeData.routes;

            const transformRoutes = allRoutes.map((route: any) => {
                const polylineString = route.geometry
                const decodedRoute = decodePolyline(polylineString);
                const transformedRoute = transformCoordinates(decodedRoute);

                return transformedRoute;
            })

            setRouteCoordinates(transformRoutes);
            // setTravelingRouteData(routeData);
        }catch(err) {
            console.error("Error fetching distance", err);
        }
    }

    // Jump to pickup point
    useEffect(() => {
        if(pickupCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [pickupCoordinate.longitude, pickupCoordinate.latitude],
                duration: 2000
            })
        }
    }, [pickupCoordinate])

    // Jump tp dropping point
    useEffect(() => {
        if(dropCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [dropCoordinate.longitude, dropCoordinate.latitude],
                duration: 2000
            })
        };

        // After the jump to dropping point, show traveling route
        // locationIQ requires [longitude,latitude] format
        if (pickupCoordinate && dropCoordinate) {
            const pickupCoordinateToString = `${pickupCoordinate.longitude},${pickupCoordinate.latitude}`;
            const dropCoordinateToString = `${dropCoordinate.longitude},${dropCoordinate.latitude}`

            getTravelingRouteData(pickupCoordinateToString, dropCoordinateToString);
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
                        <MapTravelingRoutes routeCoordinates={routeCoordinates}/>
                        <Markers />
                    </Map> 
            </div>
        </div>
    );
};
  

export default MapLibre
