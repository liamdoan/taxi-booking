'use client';

import React from 'react';
import AllRideInfo from './components/AllRideInfo';
import { useDigitCodeAuthContext } from '../shared/context/DigitCodeAuthContext';
import DigitCodeAuthPage from '../shared/components/digitCodeAuth/DigitCodeAuthPage';

const Home = () => {
    const {isAuthorized} = useDigitCodeAuthContext();
    const accessCodeDriverSide = process.env.NEXT_PUBLIC_DRIVER_ACCESS_CODE;

    if (!isAuthorized) {
        return (
            <DigitCodeAuthPage accessCode={accessCodeDriverSide as string}/>
        );
    };

    return (
        <>
            <AllRideInfo />
        </>
    )
}

export default Home
