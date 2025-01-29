import { createContext, ReactNode, useContext, useState } from 'react';

const DigitCodeAuthContext = createContext<any>(null);

export const DigitCodeAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthorizedClient, setIsAuthorizedClient] = useState(false);
    const [isAuthorizedDriver, setIsAuthorizedDriver] = useState(false);

    return (
        <DigitCodeAuthContext.Provider
            value={{ isAuthorizedClient, setIsAuthorizedClient, isAuthorizedDriver, setIsAuthorizedDriver }}
        >
            {children}
        </DigitCodeAuthContext.Provider>
    );
};

export const useDigitCodeAuthContext = () => useContext(DigitCodeAuthContext);
