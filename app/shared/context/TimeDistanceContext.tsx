import { createContext, ReactNode, useContext, useState } from 'react';

const TimeDistanceContext = createContext<any>(null);

export const TimeDistanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [formattedDistance, setFormattedDistance] = useState<string>('');
    const [formattedTime, setformattedTime] = useState<string>('');

    return (
        <TimeDistanceContext.Provider
            value={{
                formattedDistance,
                setFormattedDistance,
                formattedTime,
                setformattedTime,
            }}
        >
            {children}
        </TimeDistanceContext.Provider>
    );
};

export const useTimeDistanceContext = () => useContext(TimeDistanceContext);
