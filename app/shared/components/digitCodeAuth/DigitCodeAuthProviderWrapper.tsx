'use client';

import React, { ReactNode } from 'react';
import { DigitCodeAuthProvider } from '../../context/DigitCodeAuthContext';

const DigitCodeAuthProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <DigitCodeAuthProvider>{children}</DigitCodeAuthProvider>;
};

export default DigitCodeAuthProviderWrapper;
