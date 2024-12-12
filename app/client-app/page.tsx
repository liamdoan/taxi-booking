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
import { GuestAmountProvider } from "../shared/context/GuestAmountContext";
import { DigitCodeAuthProvider, useDigitCodeAuthContext } from "../shared/context/DigitCodeAuthContext";
import CodeAuthPageClientPage from "./components/codeAuthClient/CodeAuthClientPage";

export default function Home() {
    const {isAuthorizedClient} = useDigitCodeAuthContext();
    const accessCodeClientSide = process.env.NEXT_PUBLIC_CLIENT_ACCESS_CODE;

    if (!isAuthorizedClient) {
        return (
            <CodeAuthPageClientPage accessCode={accessCodeClientSide as string}/>
        );
    };

    return (
        <DigitCodeAuthProvider>
            <GuestAmountProvider>
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
            </GuestAmountProvider>
        </DigitCodeAuthProvider>
    );
}
