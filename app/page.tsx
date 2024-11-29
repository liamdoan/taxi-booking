'use client';

import Booking from "@/components/booking-section/Booking";
import MapLibre from "@/components/map-section/MapLibre"
import { UserLocationProvider } from "./context/UserLocationContext";
import { HasSelectedAddressProvider, InputCoordsProvider } from "./context/InputCoordsContext";
import { HasFetchTravelingRouteDataSuccessfullyProvider, TravelingRouteDataProvider } from "./context/TravelingRouteDataContext";
import { SelectedCarProvider } from "./context/SelectedCarContext";

export default function Home() {
    return (
        <UserLocationProvider>
            <InputCoordsProvider>
                <HasSelectedAddressProvider>
                    <TravelingRouteDataProvider>
                        <HasFetchTravelingRouteDataSuccessfullyProvider>
                            <SelectedCarProvider>
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
                            </SelectedCarProvider>
                        </HasFetchTravelingRouteDataSuccessfullyProvider>
                    </TravelingRouteDataProvider>
                </HasSelectedAddressProvider>
            </InputCoordsProvider>
        </UserLocationProvider>
    );
}
