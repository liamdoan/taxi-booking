import { createContext, ReactNode, useContext, useState } from 'react';

const CheckboxContext = createContext<any>(null);

export const CheckboxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tickedPickupOptionCheckbox, setTickedPickupOptionCheckbox] = useState('');
    const [tickedDropOptionCheckbox, setTickedDropOptionCheckbox] = useState('');

    return (
        <CheckboxContext.Provider
            value={{
                tickedPickupOptionCheckbox,
                setTickedPickupOptionCheckbox,
                tickedDropOptionCheckbox,
                setTickedDropOptionCheckbox,
            }}
        >
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckBoxContext = () => useContext(CheckboxContext);
