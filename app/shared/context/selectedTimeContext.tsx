import { createContext, ReactNode, useContext, useState } from "react";

const SelectedTimeContext = createContext<any>(null);

export const SelectedTimeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [hour, setHour] = useState<string>('0');
    const [minutes, setMinutes] = useState<string>('00');
    const [amPm, setAmPm] = useState<'AM' | 'PM'>('AM');


    return(
        <SelectedTimeContext.Provider
            value={{ hour, setHour, minutes, setMinutes, amPm, setAmPm }}
        >
            {children}
        </SelectedTimeContext.Provider>
    )
}

export const useSelectedTimeContext = () => useContext(SelectedTimeContext);
