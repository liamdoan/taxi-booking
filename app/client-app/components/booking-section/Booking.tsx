'use client';

import React from 'react'
import AutoSearchAddress from './AutoSearchAddress'
import Cars from './Cars';
import Payments from './Payments';
import BookButton from './BookButton';

const Booking = () => {
    // const screenHeight = window.innerHeight;
    
    return (
        <div className='px-5 pt-5 pb-10'>
            <div 
                className='rounded-md'
                // style={{height: screenHeight}}
            >
                <AutoSearchAddress />
                <Cars />
                {/* <Payments /> */}
                <BookButton />
            </div>
        </div>
    )
}

export default Booking