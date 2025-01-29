import React, { useEffect, useRef, useState } from 'react';
import { TimePickerDropdownProps } from '@/app/shared/utils/types';
import Image from 'next/image';
import { useSelectedTimeContext } from '@/app/shared/context/selectedTimeContext';

const CustomDropdown: React.FC<TimePickerDropdownProps> = ({ options, selectedValue, onSetValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: string) => {
        onSetValue(value);
        setIsOpen(false);
    };

    // Close dropdown if user clicks outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative text-white" tabIndex={0}>
            <div
                onClick={toggleDropdown}
                className="
                    cursor-pointer 
                    h-12 py-2 px-5 
                    border-2 border-gray-600 rounded-md 
                    flex justify-between items-center
                "
            >
                <span>{selectedValue}</span>
            </div>
            {isOpen && (
                <div className="absolute w-full mt-1 bg-black border-2 border-gray-600 rounded-md shadow-md z-10">
                    {options.map((option: string) => (
                        <div
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="flex justify-center items-center p-2 hover:bg-gray-700 cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TimePicker = () => {
    const { hour, setHour, minutes, setMinutes, amPm, setAmPm } = useSelectedTimeContext();

    const generateHourOptions = () => {
        const hoursArray = [];

        for (let i = 1; i <= 12; i++) {
            hoursArray.push(i.toString());
        }
        return hoursArray;
    };

    const generateMinuteOptions = () => {
        const minutesArray = [];

        for (let i = 0; i < 60; i += 5) {
            minutesArray.push(i < 10 ? `0${i}` : i.toString());
        }
        return minutesArray;
    };

    return (
        <>
            <h1 className="text-[var(--text-normal)] flex items-center mt-2">
                <Image src="/booking-side-icons/clock.svg" alt="pin-red" width={25} height={25} className="mr-1" />
                Pickup time&nbsp;<span className="text-red-500">*</span>
            </h1>
            <div className="flex items-center mt-2 space-x-2 text-white">
                <CustomDropdown options={generateHourOptions()} selectedValue={hour} onSetValue={setHour} />
                <span className="text-white">:</span>
                <CustomDropdown options={generateMinuteOptions()} selectedValue={minutes} onSetValue={setMinutes} />
                <CustomDropdown options={['AM', 'PM']} selectedValue={amPm} onSetValue={setAmPm} />
            </div>
        </>
    );
};

export default TimePicker;
