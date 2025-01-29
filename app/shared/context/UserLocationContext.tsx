import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const UserLocationContext = createContext<any>(null);

export const UserLocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userLocation, setUserLocation] = useState<any>();

    useEffect(() => {
        const getUserLocation = () => {
            navigator.geolocation.getCurrentPosition((location) => {
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            });
        };

        getUserLocation();
    }, []);

    return (
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocation = () => useContext(UserLocationContext);
