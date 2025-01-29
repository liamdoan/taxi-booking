'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useUserLocation } from '@/app/shared/context/UserLocationContext';
import { useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import { decodePolyline } from '@/app/shared/utils/decodePolyline';
import { transformCoordinates } from '@/app/shared/utils/decodePolyline';
import Map from 'react-map-gl/maplibre';
import Markers from './Markers';
import MapTravelingRoutes from './MapTravelingRoutes';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
    useHasFetchTravelingRouteDataSuccessfullyContext,
    useTravelingRouteDataContext,
} from '@/app/shared/context/TravelingRouteDataContext';
import TimeDistance from './TimeDistance';

const mapTilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const CentrumHelsinkiDefaultCoords = {
    latitude: 60.170386,
    longitude: 24.9407,
};

const MapLibre = () => {
    const { userLocation } = useUserLocation();
    const { pickupCoordinate, dropCoordinate } = useInputCoordsContext();
    const { travelingRouteData, setTravelingRouteData, routeCoordinates, setRouteCoordinates } =
        useTravelingRouteDataContext();
    const { setHasFetchTravelingRouteDataSuccessfully } = useHasFetchTravelingRouteDataSuccessfullyContext();

    const [longitude, setLongitude] = useState(CentrumHelsinkiDefaultCoords.longitude);
    const [latitude, setLatitude] = useState(CentrumHelsinkiDefaultCoords.latitude);

    const mapRef = useRef<any>();

    //Calculate routes
    const getTravelingRouteData = async (coord1: any, coord2: any) => {
        try {
            const res = await fetch('/api/calculate-routing?pickup=' + coord1 + '&drop=' + coord2);
            const routeData = await res.json();

            if (routeData.code == 200 || routeData.code == 'Ok') {
                setHasFetchTravelingRouteDataSuccessfully(true);
            } else {
                setHasFetchTravelingRouteDataSuccessfully(false);
            }

            const allRoutes = routeData.routes;

            const transformRoutes = allRoutes.map((route: any) => {
                const polylineString = route.geometry;
                const decodedRoute = decodePolyline(polylineString);
                const transformedRoute = transformCoordinates(decodedRoute);

                return transformedRoute;
            });

            setRouteCoordinates(transformRoutes);
            setTravelingRouteData(routeData);
        } catch (err) {
            console.error('Error fetching distance', err);
        }
    };

    // Jump to pickup point
    useEffect(() => {
        if (pickupCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [pickupCoordinate.longitude, pickupCoordinate.latitude],
                duration: 2000,
            });
        }
    }, [pickupCoordinate]);

    // Jump tp dropping point
    useEffect(() => {
        if (dropCoordinate && mapRef.current) {
            mapRef.current.flyTo({
                center: [dropCoordinate.longitude, dropCoordinate.latitude],
                duration: 2000,
            });
        }

        // After the jump to dropping point, show traveling route
        // locationIQ requires [longitude,latitude] format
        if (pickupCoordinate && dropCoordinate) {
            const pickupCoordinateToString = `${pickupCoordinate.longitude},${pickupCoordinate.latitude}`;
            const dropCoordinateToString = `${dropCoordinate.longitude},${dropCoordinate.latitude}`;

            getTravelingRouteData(pickupCoordinateToString, dropCoordinateToString);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pickupCoordinate, dropCoordinate]);

    useEffect(() => {
        if (userLocation) {
            setLongitude(userLocation.longitude);
            setLatitude(userLocation.latitude);
        }
    }, [userLocation]);

    return (
        <div className="p-5">
            <div className="relative">
                <div className="overflow-hidden">
                    <Map
                        ref={mapRef}
                        initialViewState={{
                            longitude: longitude,
                            latitude: latitude,
                            zoom: 10,
                        }}
                        style={{ width: '100%', height: 600 }}
                        mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`}
                    >
                        <MapTravelingRoutes routeCoordinates={routeCoordinates} />
                        <Markers />
                    </Map>
                </div>
                {travelingRouteData && (
                    <div className="bg-yellow-500 absolute bottom-2 left-2 rounded-md pt-1 pb-1 pl-2 pr-2">
                        <TimeDistance />
                    </div>
                )}
            </div>
            {travelingRouteData && (
                <div className="my-2 text-[var(--text-normal)]">
                    <div className="flex items-center">
                        <div className="w-[3rem] h-[5px] rounded-md mr-3 bg-[#218cf8]"></div>
                        <span className="text-[0.7rem]">shortest route</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[3rem] h-[5px] rounded-md mr-3 bg-[#32cd32]"></div>
                        <span className="text-[0.7rem]">alternative route</span>
                    </div>
                    <p className="text-[0.7rem] my-2 italic">
                        * Distance, time, price are calculated based on the shortest estimated route.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MapLibre;
