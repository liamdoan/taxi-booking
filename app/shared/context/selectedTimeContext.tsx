import { createContext, ReactNode, useContext, useState } from 'react';

const SelectedTimeContext = createContext<any>(null);

export const SelectedTimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [hour, setHour] = useState<string>('12');
    const [minutes, setMinutes] = useState<string>('00');
    const [amPm, setAmPm] = useState<'AM' | 'PM'>('AM');

    const convert12To24HourFormat = () => {
        let convertedHour = parseInt(hour);

        if (amPm === 'AM') {
            if (convertedHour === 12) {
                convertedHour = 0;
            }
        } else if (amPm === 'PM') {
            if (convertedHour !== 12) {
                convertedHour = convertedHour + 12;
            }
        }

        const hourIn2digitForm = String(convertedHour).padStart(2, '0');

        const formattedPickupTime = `${hourIn2digitForm}:${minutes}`;
        return formattedPickupTime;
    };

    return (
        <SelectedTimeContext.Provider
            value={{ hour, setHour, minutes, setMinutes, amPm, setAmPm, convert12To24HourFormat }}
        >
            {children}
        </SelectedTimeContext.Provider>
    );
};

export const useSelectedTimeContext = () => useContext(SelectedTimeContext);
