import { createContext, ReactNode, useContext, useState } from 'react';

const GuestAmountContext = createContext<any>(null);

export const GuestAmountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [guestName, setGuestName] = useState<string>('');
    const [guestAmount, setGuestAmount] = useState<string>('1');

    return (
        <GuestAmountContext.Provider value={{ guestName, setGuestName, guestAmount, setGuestAmount }}>
            {children}
        </GuestAmountContext.Provider>
    );
};

export const useGuestAmountContext = () => useContext(GuestAmountContext);
