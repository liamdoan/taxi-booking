import { createContext, ReactNode, useContext, useState } from "react";

const SelectedDayContext = createContext<any>(null);

export const SelectedDayProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [selectedDayName, setSelectedDayName] = useState<string>('');
    const [selectedDayDate, setSelectedDayDate] = useState<string>('');

    return(
        <SelectedDayContext.Provider
            value={{
                selectedDay,
                setSelectedDay,
                selectedDayName,
                setSelectedDayName,
                selectedDayDate,
                setSelectedDayDate
            }}
        >
            {children}
        </SelectedDayContext.Provider>
    )
}

export const useSelectedCarContext = () => useContext(SelectedDayContext);
