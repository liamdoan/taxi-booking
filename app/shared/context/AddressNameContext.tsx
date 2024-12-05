import { createContext, ReactNode, useContext, useState } from "react";

const AddressNameContext = createContext<any>(null);

export const AddressNameProvider: React.FC<{ children: ReactNode}> = ({children}) => {
    const [pickupAddressFromInput, setPickupAddressFromInput] = useState<string>('');
    const [dropAddressFromInput, setDropAddressFromInput] = useState<string>('');
    
    return (
        <AddressNameContext.Provider
            value={{
                pickupAddressFromInput,
                setPickupAddressFromInput,
                dropAddressFromInput,
                setDropAddressFromInput
            }}
        >
            {children}
        </AddressNameContext.Provider>
    );
};

export const useAddressNameContext = () => useContext(AddressNameContext);
