import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface Coordidates {
    latitude: number;
    longitude: number;
};

interface InputCoordsContext {
    pickupCoordinate: Coordidates | null,
    setPickupCoordinate: Dispatch<SetStateAction<Coordidates | null>>;
    dropCoordinate: Coordidates | null,
    setDropCoordinate: Dispatch<SetStateAction<Coordidates | null>>;
}

const InputCoordsContext = createContext<InputCoordsContext | null>(null);

export const InputCoordsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
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
