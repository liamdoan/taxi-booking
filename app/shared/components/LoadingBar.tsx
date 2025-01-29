import React from 'react';

const LoadingBar: React.FC = () => {
    return (
        <div className="relative w-full h-[6px] bg-gray-200 rounded-md">
            <style jsx>{`
                @keyframes loading {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
                    }
                }
            `}</style>
            <div
                className="absolute top-0 left-0 h-full bg-yellow-400 rounded"
                style={{
                    animation: 'loading 2s linear infinite',
                }}
            ></div>
        </div>
    );
};

export default LoadingBar;
