'use client';

import Booking from "@/app/client-app/components/booking-section/Booking";
import MapLibre from "@/app/client-app/components/map-section/MapLibre"
import { UserLocationProvider } from "../shared/context/UserLocationContext";
import { HasSelectedAddressProvider, InputCoordsProvider } from "../shared/context/InputCoordsContext";
import { HasFetchTravelingRouteDataSuccessfullyProvider, TravelingRouteDataProvider } from "../shared/context/TravelingRouteDataContext";
import { SelectedCarProvider } from "../shared/context/SelectedCarContext";
import { AddressNameProvider } from "../shared/context/AddressNameContext";
import { SelectedDayProvider } from "../shared/context/SelectedDayContext";
import { SelectedTimeProvider } from "../shared/context/selectedTimeContext";
import { TimeDistanceProvider } from "../shared/context/TimeDistanceContext";
import { CheckboxProvider } from "../shared/context/CheckBoxContext";

export default function Home() {
    return (
        <UserLocationProvider>
            <InputCoordsProvider>
                <HasSelectedAddressProvider>
                    <TravelingRouteDataProvider>
                        <HasFetchTravelingRouteDataSuccessfullyProvider>
                            <AddressNameProvider>
                                <SelectedDayProvider>
                                    <CheckboxProvider>
                                        <SelectedTimeProvider>
                                            <TimeDistanceProvider>
                                                <SelectedCarProvider>
                                                    <div>
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[100vh]">
                                                            <div className="bg-[var(--foreground)]">
                                                                <Booking />
                                                            </div>
                                                            <div className="bg-[var(--foreground)] col-span-2">
                                                                <MapLibre />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SelectedCarProvider>
                                            </TimeDistanceProvider>
                                        </SelectedTimeProvider>
                                    </CheckboxProvider>
                                </SelectedDayProvider>
                            </AddressNameProvider>
                        </HasFetchTravelingRouteDataSuccessfullyProvider>
                    </TravelingRouteDataProvider>
                </HasSelectedAddressProvider>
            </InputCoordsProvider>
        </UserLocationProvider>
    );
}
