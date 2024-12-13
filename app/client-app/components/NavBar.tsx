'use client';

import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDigitCodeAuthContext } from '@/app/shared/context/DigitCodeAuthContext';

const NavBar = () => {
    const router = useRouter();
    const {isAuthorizedClient} = useDigitCodeAuthContext();

    if (!isAuthorizedClient) {
        return;
    }

    return (
        <div className='flex justify-between py-3 px-4 border-b-[2px] shadow-lg'>
            <div className='gap-10 flex justify-center items-center'>
                <Image
                    src='/splash-logo.png'
                    alt='logo'
                    width={200}
                    height={0}
                    style={{ height: 'auto' }}
                />
            </div>
            <div className='flex gap-5 items-center'> {/* add 'hidden sm:' in front to hide elem when screen size is small */}
                <h2
                    className='hover:bg-yellow-400 cursor-pointer py-1 px-3 rounded-md transition-all'
                    onClick={() => router.push('/client-app')}
                >
                    Home
                </h2>
                <h2
                    className='hover:bg-yellow-400 cursor-pointer py-1 px-3 rounded-md transition-all'
                    onClick={() => router.push('/client-app/ride-history')}
                >
                    History
                </h2>
                <h2
                    className='hover:bg-yellow-400 cursor-pointer py-1 px-3 rounded-md transition-all'
                    onClick={() => router.push('/support')}
                >
                    Contact
                </h2>
            </div>
            <div>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default NavBar
