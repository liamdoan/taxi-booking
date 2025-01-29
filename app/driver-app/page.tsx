'use client';

import React, { useEffect } from 'react';
import AllRideInfo from './components/AllRideInfo';
import { useDigitCodeAuthContext } from '../shared/context/DigitCodeAuthContext';
import CodeAuthDriverPage from './components/codeAuthDriver/CodeAuthDriverPage';

const Home = () => {
    const { isAuthorizedDriver, setIsAuthorizedDriver } = useDigitCodeAuthContext();
    const accessCodeDriverSide = process.env.NEXT_PUBLIC_DRIVER_ACCESS_CODE;

    const AUTHORIZATION_TIMEOUT = 60 * 60 * 1000; //1hr

    useEffect(() => {
        const checkAuthorization = () => {
            const accessedTimeDriver = localStorage.getItem('accessedTimeDriver');

            if (accessedTimeDriver) {
                const elapsedTime = Date.now() - Number(accessedTimeDriver);

                if (elapsedTime <= AUTHORIZATION_TIMEOUT) {
                    setIsAuthorizedDriver(true);
                } else {
                    setIsAuthorizedDriver(false);
                }
            } else {
                setIsAuthorizedDriver(false);
            }
        };

        checkAuthorization();
    }, []);

    if (!isAuthorizedDriver) {
        return <CodeAuthDriverPage accessCode={accessCodeDriverSide as string} />;
    }

    return (
        <>
            <AllRideInfo />
        </>
    );
};

export default Home;
