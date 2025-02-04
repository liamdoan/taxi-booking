'use client';

import React from 'react';
import AutoSearchAddress from './AutoSearchAddress';
import Cars from './Cars';
import BookButton from './BookButton';
import RegisterGuests from './RegisterGuests';
import DayPicker from './DayPicker';
import TimePicker from './TimePicker';
// import Payments from './Payments';

const Booking = () => {
    // const screenHeight = window.innerHeight;

    return (
        <div className="px-5 pt-5 pb-10">
            <div
                className="rounded-md"
                // style={{height: screenHeight}}
            >
                <RegisterGuests />
                <AutoSearchAddress />
                <DayPicker />
                <TimePicker />
                <Cars />
                {/* <Payments /> */}
                <BookButton />
            </div>
        </div>
    );
};

export default Booking;
