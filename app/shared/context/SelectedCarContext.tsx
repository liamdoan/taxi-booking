import { createContext, ReactNode, useContext, useState } from 'react';

const SelectedCarContext = createContext<any>(null);

export const SelectedCarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedCar, setSelectedCar] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    return (
        <SelectedCarContext.Provider value={{ selectedCar, setSelectedCar, selectedCategory, setSelectedCategory }}>
            {children}
        </SelectedCarContext.Provider>
    );
};

export const useSelectedCarContext = () => useContext(SelectedCarContext);
