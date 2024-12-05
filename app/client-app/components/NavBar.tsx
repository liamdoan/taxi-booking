'use client';

import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NavBar = () => {
    const router = useRouter();
  return (
    <div className='flex justify-between py-3 px-4 border-b-[2px] shadow-lg'>
        <div className='bg-yellow-400 gap-10'>
            <Image
                src='/slush-logo.png'
                alt='logo'
                width={120}
                height={60}
                style={{ width: '100%', height: 'auto' }}
                priority
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
                Help
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
