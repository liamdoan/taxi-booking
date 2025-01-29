import { createContext, ReactNode, useContext, useState } from 'react';

const SelectedDayContext = createContext<any>(null);

export const SelectedDayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedDayId, setSelectedDayId] = useState<any>(null);
    const [selectedDayName, setSelectedDayName] = useState<string>('');
    const [selectedDayDate, setSelectedDayDate] = useState<string>('');
    const [completedDate, setCompletedDate] = useState('');

    return (
        <SelectedDayContext.Provider
            value={{
                selectedDayId,
                setSelectedDayId,
                selectedDayName,
                setSelectedDayName,
                selectedDayDate,
                setSelectedDayDate,
                completedDate,
                setCompletedDate,
            }}
        >
            {children}
        </SelectedDayContext.Provider>
    );
};

export const useSelectedDayContext = () => useContext(SelectedDayContext);
