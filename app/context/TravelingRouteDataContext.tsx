import { createContext, ReactNode, useContext, useState } from "react";

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
