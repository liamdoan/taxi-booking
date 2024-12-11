'use-client';

import React from 'react';
import Image from 'next/image';
import EventDays from '../../data/EventDays';
import { useSelectedDayContext } from '@/app/shared/context/SelectedDayContext';

const DayPicker = () => {
    const {
        selectedDayId,
        setSelectedDayId,
        setSelectedDayName,
        setSelectedDayDate,
    } = useSelectedDayContext();

    const handleClick = (id: number, name: string, date: string) => {
        setSelectedDayId(id);
        setSelectedDayName(name);
        setSelectedDayDate(date);
    };

    const handleKeyDown = (e: any, id: number, name: string, date: string) => {
        if (e.key === 'Enter' || e.key ===' '){
            e.preventDefault();
            handleClick(id, name, date);
        }
    };

    return (
        <div className='text-white mt-2'>
            <h1 className='text-[var(--text-normal)] flex items-center'>
                <Image src="/booking-side-icons/calendar-icon.png" alt='calendar-icon' width={25} height={25} className='mr-1'/>
                Pickup day&nbsp;<span className='text-red-500'>*</span>
            </h1>
            <div className='
                flex flex-wrap justify-between 
                mt-2 gap-2
            '>
                {EventDays.map((day) => (
                    <div 
                        key={day.id}
                        tabIndex={0}
                        onClick={() => handleClick(day.id, day.name, day.date)}
                        onKeyDown={(e) => handleKeyDown(e, day.id, day.name, day.date)}
                        className={`
                            border-2 border-gray-600 rounded-md
                            my-1 p-3
                            flex flex-col justify-center items-center
                            cursor-pointer
                            ${day.id == selectedDayId && 'border-yellow-400 border-[3px]'}
                        `}
                    >
                        <h1 className='mb-2 font-bold text-yellow-400'>{day.name}</h1>
                        <p className='text-[14px] text-gray-300'>{day.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DayPicker
