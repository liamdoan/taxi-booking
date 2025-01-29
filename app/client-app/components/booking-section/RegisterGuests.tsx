import React, { useEffect, useRef, useState } from 'react';
import { useGuestAmountContext } from '@/app/shared/context/GuestAmountContext';

const RegisterGuests = () => {
    const { guestName, setGuestName } = useGuestAmountContext();

    return (
        <div className="p-1 flex flex-wrap justify-between gap-4 items-center">
            <div className="py-2 w-[70%]">
                <label
                    className="
                        text-[var(--text-normal)]
                        flex items-start
                    "
                >
                    {/* <Image src="/booking-side-icons/pin-red.png" alt='pin-red' width={20} height={10} className='mr-1'/> */}
                    Guest name&nbsp;<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={guestName}
                    className="
                        bg-transparent text-[var(--text-normal)] border-[1px]
                        mt-2 p-3
                        w-full rounded-md
                        outline-none
                        focus:bg-[var(--input-focus)]
                        disabled:opacity-45
                        disabled:cursor-not-allowed
                        transition-all
                    "
                    onChange={(e) => setGuestName(e.target.value)}
                />
            </div>
            <div>
                <GuestNumberPicker />
            </div>
        </div>
    );
};

export default RegisterGuests;

const CustomDropdown: React.FC<any> = ({ options, selectedValue, onSetValue }) => {
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
                    h-14 py-2 px-5 
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

const GuestNumberPicker = () => {
    const { guestAmount, setGuestAmount } = useGuestAmountContext();

    const generateOptions = () => {
        const guestAmountOptionArray = [];

        for (let i = 1; i <= 7; i++) {
            guestAmountOptionArray.push(i.toString());
        }
        return guestAmountOptionArray;
    };

    return (
        <>
            <h1 className="text-[var(--text-normal)] flex items-center ">
                Amount of guests&nbsp;<span className="text-red-500">*</span>
            </h1>
            <div className="flex items-center mt-2 space-x-2 text-white">
                <CustomDropdown options={generateOptions()} selectedValue={guestAmount} onSetValue={setGuestAmount} />
            </div>
        </>
    );
};
