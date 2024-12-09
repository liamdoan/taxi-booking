'use-client';

import React from 'react';
import Image from 'next/image';
import EventDays from '../../data/EventDays';
import { useSelectedDayContext } from '@/app/shared/context/SelectedDayContext';

const DayPicker = () => {
    const {
        selectedDay,
        setSelectedDay,
        selectedDayName,
        setSelectedDayName,
        selectedDayDate,
        setSelectedDayDate
    } = useSelectedDayContext();

    const handleClick = (id: number, name: string, date: string) => {
        setSelectedDay(id);
        setSelectedDayName(name);
        setSelectedDayDate(date);
    };

    const handleKeyDown = (e: any, id: number, name: string, date: string) => {
        if (e.key === 'Enter' || e.key ===' '){
            e.preventDefault();
            handleClick(id, name, date);
        }
    }

    const handleSubmit = () => {
        if (selectedDay) {
          console.log(`Selected Day: ${selectedDay}, ${selectedDayName}, ${selectedDayDate}`);
        } else {
          console.error('No day selected!');
        }
    };

    return (
        <div className='text-white mt-2'>
            <h1 className='text-[var(--text-normal)] flex items-center'>
                <Image src="/location-pin-img/calendar-icon.png" alt='calendar-icon' width={25} height={25} className='mr-1'/>
                Pickup day
            </h1>
            <div className='
                flex flex-wrap justify-between 
                mt-2
            '>
                {EventDays.map((day) => (
                    <div 
                        key={day.id}
                        tabIndex={0}
                        onClick={() => handleClick(day.id, day.name, day.date)}
                        onKeyDown={(e) => handleKeyDown(e, day.id, day.name, day.date)}
                        className={`
                            border-2 border-gray-600 rounded-md
                            p-3
                            flex flex-col justify-center items-center
                            cursor-pointer
                            ${day.id == selectedDay && 'border-yellow-400 border-[3px]'}
                        `}
                    >
                        <h1 className='mb-2 font-bold text-yellow-400'>{day.name}</h1>
                        <p className='text-[14px] text-gray-300'>{day.date}</p>
                    </div>
                ))}
                 <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default DayPicker