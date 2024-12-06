import { createContext, ReactNode, useContext, useState } from "react";

// get route data context
const TravelingRouteDataContext = createContext<any>(null);

export const TravelingRouteDataProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [travelingRouteData, setTravelingRouteData] = useState<any>();

    return (
    <TravelingRouteDataContext.Provider
        value={{
            travelingRouteData,
            setTravelingRouteData
        }}
    >
        {children}
    </TravelingRouteDataContext.Provider>
    )
};

export const userTravelingRouteDataContext = () => useContext(TravelingRouteDataContext);

// if getting data successfully context
//hasSelectedAddress context
const HasFetchTravelingRouteDataSuccessfullyContext = createContext<any>(null);

export const HasFetchTravelingRouteDataSuccessfullyProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [hasFetchTravelingRouteDataSuccessfully, setHasFetchTravelingRouteDataSuccessfully] = useState<boolean>(false);

    return (
        <HasFetchTravelingRouteDataSuccessfullyContext.Provider
            value={{
                hasFetchTravelingRouteDataSuccessfully,
                setHasFetchTravelingRouteDataSuccessfully
            }}
        >
            {children}
        </HasFetchTravelingRouteDataSuccessfullyContext.Provider>
    )
}

export const useHasFetchTravelingRouteDataSuccessfullyContext = () => useContext(HasFetchTravelingRouteDataSuccessfullyContext);
