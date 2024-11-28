'use client';

import Booking from "@/components/booking-section/Booking";
import MapLibre from "@/components/map-section/MapLibre"
import { UserLocationProvider } from "./context/UserLocationContext";
import { InputCoordsProvider } from "./context/InputCoordsContext";
import { TravelingRouteDataProvider } from "./context/TravelingRouteDataContext";

export default function Home() {
    return (
        <UserLocationProvider>
            <InputCoordsProvider>
                <TravelingRouteDataProvider>
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            <div className="bg-yellow-200">
                                <Booking />
                            </div>
                            <div className="bg-yellow-400 col-span-2">
                                <MapLibre />
                            </div>
                        </div>
                    </div>
                </TravelingRouteDataProvider>
            </InputCoordsProvider>
        </UserLocationProvider>
    );
}
