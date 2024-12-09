import React, { useState } from 'react';

const TimePicker = () => {
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('00');
    const [period, setPeriod] = useState('AM');

    const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setHours(event.target.value);
    };

    const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMinutes(event.target.value);
    };

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriod(event.target.value);
    };

    // Submit the selected time in a formatted string (e.g., "12:30 PM")
    //   const handleSubmit = () => {
    //     const time = `${hours}:${minutes} ${period}`;
    //     onTimeSelect(time); // Send the time to the parent or backend
    //   };


    const generateHourOptions = () => {
        const options = [];
        for (let i = 0; i <= 12; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    const generateMinuteOptions = () => {
        const options = [];
        for (let i = 0; i < 60; i += 5) {
        const minute = i < 10 ? `0${i}` : `${i}`;
        options.push(<option key={minute} value={minute}>{minute}</option>);
        }
        return options;
    };

    return (
        <div className="time-picker text-white">
            <select
                className='
                    p-2
                    mr-1
                    bg-transparent
                    border-2 border-gray-600 rounded-md
                    appearance-none
                    focus:border-yellow-400 focus:outline-none
                '
                onChange={handleHoursChange} value={hours}
            >
                {generateHourOptions()}
            </select>
            <span className='text-white mr-1'>:</span>
            <select
                className='
                    p-2
                    mr-2
                    bg-transparent
                    border-2 border-gray-600 rounded-md
                    appearance-none
                    focus:border-yellow-400 focus:outline-none
                '
                onChange={handleMinutesChange} value={minutes}
            >
                {generateMinuteOptions()}
            </select>
            <select
                className='
                    p-2
                    mr-2
                    bg-transparent
                    border-2 border-gray-600 rounded-md
                    appearance-none
                    focus:border-yellow-400 focus:outline-none
                '
                onChange={handlePeriodChange} value={period}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <button className='text-white'>Submit</button>
        </div>
    );
};

export default TimePicker;
