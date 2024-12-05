import { createContext, ReactNode, useContext, useState } from "react";

const SelectedCarContext = createContext<any>(null);

export const SelectedCarProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [selectedCar, setSelectedCar] = useState<any>(null);

    return (
        <SelectedCarContext.Provider
            value={{selectedCar, setSelectedCar}}
        >
            {children}
        </SelectedCarContext.Provider>
    )
}

export const useSelectedCarContext = () => useContext(SelectedCarContext);
