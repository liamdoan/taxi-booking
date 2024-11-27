'use client';

import React from 'react'
import AutoSearchAddress from './AutoSearchAddress'

const Booking = () => {
    // const screenHeight = window.innerHeight;
    
    return (
        <div className='p-5'>
            <h2 className='text-[1rem]'>Book Slush taxi</h2>
            <div 
                className='border-[1px] rounded-md' 
                // style={{height: screenHeight}}
            >
                <AutoSearchAddress />
            </div>
        </div>
    )
}

export default Booking