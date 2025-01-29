import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

//Coordinates context
interface Coordidates {
    latitude: number;
    longitude: number;
}

interface InputCoordsContext {
    pickupCoordinate: Coordidates | null;
    setPickupCoordinate: Dispatch<SetStateAction<Coordidates | null>>;
    dropCoordinate: Coordidates | null;
    setDropCoordinate: Dispatch<SetStateAction<Coordidates | null>>;
}

const InputCoordsContext = createContext<InputCoordsContext | null>(null);

export const InputCoordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pickupCoordinate, setPickupCoordinate] = useState<Coordidates | null>(null);
    const [dropCoordinate, setDropCoordinate] = useState<Coordidates | null>(null);

    return (
        <InputCoordsContext.Provider
            value={{
                pickupCoordinate,
                setPickupCoordinate,
                dropCoordinate,
                setDropCoordinate,
            }}
        >
            {children}
        </InputCoordsContext.Provider>
    );
};

export const useInputCoordsContext = () => {
    const context = useContext(InputCoordsContext);

    if (!context) {
        throw new Error('useInputCoordsContext must be used within a InputCoordsProvider');
    }

    return context;
};

//hasSelectedAddress context
const HasSelectedAddressContext = createContext<any>(null);

export const HasSelectedAddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [hasSelectedPickupAddress, setHasSelectedPickupAddress] = useState<boolean>(false);
    const [hasSelectedDropAddress, setHasSelectedDropAddress] = useState<boolean>(false);

    return (
        <HasSelectedAddressContext.Provider
            value={{
                hasSelectedPickupAddress,
                setHasSelectedPickupAddress,
                hasSelectedDropAddress,
                setHasSelectedDropAddress,
            }}
        >
            {children}
        </HasSelectedAddressContext.Provider>
    );
};

export const useHasSelectedAddressContext = () => useContext(HasSelectedAddressContext);
