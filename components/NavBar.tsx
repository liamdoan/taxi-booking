import React from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

const NavBar = () => {
  return (
    <div className='flex justify-between py-3 px-4 border-b-[2px] shadow-lg'>
        <div className='bg-yellow-400 gap-10'>
            <Image src='/slush-logo.png' alt='logo' width={120} height={60}/>
        </div>
        <div className='flex gap-5 items-center'> {/* add 'hidden sm:' in front to hide elem when screen size is small */}
            <h2 className='hover:bg-yellow-400 cursor-pointer p-1 transition-all'>home</h2>
            <h2 className='hover:bg-yellow-400 cursor-pointer p-1 transition-all'>history</h2>
            <h2 className='hover:bg-yellow-400 cursor-pointer p-1 transition-all'>help</h2>
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
