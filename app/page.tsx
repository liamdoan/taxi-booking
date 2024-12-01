'use client';

import Booking from "@/components/booking-section/Booking";
import MapLibre from "@/components/map-section/MapLibre"
import { UserLocationProvider } from "./context/UserLocationContext";
import { HasSelectedAddressProvider, InputCoordsProvider } from "./context/InputCoordsContext";
import { HasFetchTravelingRouteDataSuccessfullyProvider, TravelingRouteDataProvider } from "./context/TravelingRouteDataContext";
import { SelectedCarProvider } from "./context/SelectedCarContext";
import { AddressNameProvider } from "./context/AddressNameContext";

export default function Home() {
    return (
        <UserLocationProvider>
            <InputCoordsProvider>
                <HasSelectedAddressProvider>
                    <TravelingRouteDataProvider>
                        <HasFetchTravelingRouteDataSuccessfullyProvider>
                            <AddressNameProvider>
                                <SelectedCarProvider>
                                    <div>
                                        <div className="grid grid-cols-1 lg:grid-cols-3">
                                            <div className="bg-[var(--foreground)]">
                                                <Booking />
                                            </div>
                                            <div className="bg-[var(--foreground)] col-span-2">
                                                <MapLibre />
                                            </div>
                                        </div>
                                    </div>
                                </SelectedCarProvider>
                            </AddressNameProvider>
                        </HasFetchTravelingRouteDataSuccessfullyProvider>
                    </TravelingRouteDataProvider>
                </HasSelectedAddressProvider>
            </InputCoordsProvider>
        </UserLocationProvider>
    );
}
