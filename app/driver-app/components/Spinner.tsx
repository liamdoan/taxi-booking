import React from 'react';

interface SpinnerProps {
    width?: number,
    height?: number
}

const Spinner: React.FC<SpinnerProps> = ({ width, height}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className={`
                w-${width} h-${height} 
                border-4 border-t-6 border-gray-300 border-t-yellow-500 rounded-full 
                animate-spin
            `}></div>
        </div>
    );
};

export default Spinner;
