import React from 'react';
import { useDigitCodeAuthContext } from '@/app/shared/context/DigitCodeAuthContext';

const LogOutButton = () => {
    const { setIsAuthorizedDriver } = useDigitCodeAuthContext();

    const handleLogout = () => {
        localStorage.removeItem('accessedTimeDriver');
        setIsAuthorizedDriver(false);
    };

    return (
        <button
            className="
                text-red-700
                border-2 border-red-700 rounded-md
                py-3 px-5
                hover:text-white hover:border-red-700 hover:bg-red-700
                transition-all
            "
            onClick={handleLogout}
        >
            Log Out
        </button>
    );
};

export default LogOutButton;
