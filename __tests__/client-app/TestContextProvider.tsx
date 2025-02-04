import { AddressNameProvider } from "@/app/shared/context/AddressNameContext";
import { CheckboxProvider } from "@/app/shared/context/CheckBoxContext";
import { DigitCodeAuthProvider } from "@/app/shared/context/DigitCodeAuthContext";
import { GuestAmountProvider } from "@/app/shared/context/GuestAmountContext";
import { HasSelectedAddressProvider, InputCoordsProvider } from "@/app/shared/context/InputCoordsContext";
import { SelectedCarProvider } from "@/app/shared/context/SelectedCarContext";
import { SelectedDayProvider } from "@/app/shared/context/SelectedDayContext";
import { SelectedTimeProvider } from "@/app/shared/context/selectedTimeContext";
import { TimeDistanceProvider } from "@/app/shared/context/TimeDistanceContext";
import { HasFetchTravelingRouteDataSuccessfullyProvider, TravelingRouteDataProvider } from "@/app/shared/context/TravelingRouteDataContext";
import { UserLocationProvider } from "@/app/shared/context/UserLocationContext";
import React, { ReactNode } from "react";

export const TestContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
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
                                                            {children}
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
    )
};
