import { useDigitCodeAuthContext } from '@/app/shared/context/DigitCodeAuthContext';
import { DigitCodeAuthPageProps } from '@/app/shared/utils/types';
import React, { useRef, useState } from 'react';

const CodeAuthClientPage: React.FC<DigitCodeAuthPageProps> = ({ accessCode }) => {
    const { setIsAuthorizedClient } = useDigitCodeAuthContext();

    const [failMessage, setFailMessage] = useState(false);
    const [code, setCode] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (value: string, index: number) => {
        if (isNaN(Number(value)) || value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        const isAllInputsFilled = newCode.every((digit) => digit !== '');

        if (failMessage && value !== '') {
            setFailMessage(false);
        }

        if (isAllInputsFilled) {
            const enteredCode = newCode.join('');

            if (enteredCode === accessCode) {
                setIsAuthorizedClient(true);

                const currentTime = Date.now();
                localStorage.setItem('accessedTimeClient', currentTime.toString());
            } else {
                setFailMessage(true);
                setCode(['', '', '', '']);

                inputRefs.current[0]?.focus();
            }
        } else if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && code[index] === '') {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="min-h-[100vh]">
            <div
                className="
                flex items-center justify-center
                bg-[var(--foreground)]
                text-white"
                style={{ height: 'calc(100vh - 6rem)' }}
            >
                <div className="text-center">
                    <h1 className="text-[1.5rem] text-yellow-500 font-bold mb-6">Enter Access Code</h1>
                    <div className="flex gap-2 justify-center">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el: any) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="
                                    w-16 h-16 
                                    text-center 
                                    border border-gray-500 rounded-md
                                    bg-[var(--foreground)]
                                    text-[var(--text-normal)] text-[2rem]
                                    focus:outline-none focus:border-yellow-500
                                "
                            />
                        ))}
                    </div>
                    {failMessage && (
                        <p className="my-6 text-red-500">
                            Incorrect code. Please provide the correct code or contact us.
                        </p>
                    )}
                </div>
            </div>
            <p
                className="
                text-[var(--text-normal)] text-center 
                flex justify-center items-center h-[6rem]
                bg-[var(--foreground)]
                "
            >
                Should any issue arise, please contact us!
            </p>
        </div>
    );
};

export default CodeAuthClientPage;

// Plan flow of the code auth:
// validate if input is number, and each input can only has 1 value
// validate if all inputs are filled with number
// If all inputs are filled, join values as a string, and compared with correct code
// If code is correct, authorization is ok
// If code is wrong, reset all values, switch focus back to first input
// if current input has value, and it's not the last input, switch focus to next one
// If user hits backspace, focus will switch to previous input andits digit will be removed
