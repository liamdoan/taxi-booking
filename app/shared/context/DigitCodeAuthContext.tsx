import { createContext, ReactNode, useContext, useState } from "react";

const DigitCodeAuthContext = createContext<any>(null);

export const DigitCodeAuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    return (
        <DigitCodeAuthContext.Provider value={{isAuthorized, setIsAuthorized}}>
            {children}
        </DigitCodeAuthContext.Provider>
    )
}

export const useDigitCodeAuthContext = () => useContext(DigitCodeAuthContext);
