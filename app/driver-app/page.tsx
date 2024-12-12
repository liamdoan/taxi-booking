'use client';

import React from 'react';
import AllRideInfo from './components/AllRideInfo';
import { useDigitCodeAuthContext } from '../shared/context/DigitCodeAuthContext';
import CodeAuthDriverPage from './components/codeAuthDriver/CodeAuthPageDriverPage';

const Home = () => {
    const {isAuthorizedDriver} = useDigitCodeAuthContext();
    const accessCodeDriverSide = process.env.NEXT_PUBLIC_DRIVER_ACCESS_CODE;

    if (!isAuthorizedDriver) {
        return (
            <CodeAuthDriverPage accessCode={accessCodeDriverSide as string}/>
        );
    };

    return (
        <>
            <AllRideInfo />
        </>
    )
}

export default Home
