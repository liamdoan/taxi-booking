import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-t-6 border-gray-300 border-t-yellow-500 rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;
