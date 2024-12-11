import React from 'react';
import Image from 'next/image';
import ContactEmails from '../client-app/data/ContactEmails';

const page = () => {
  return (
    <div
        className="
            relative
            p-10 min-h-[100vh] 
            bg-[url('/support-img/bg-event.jpg')]
            bg-no-repeat bg-cover bg-center
        "
    >
        <div className='absolute inset-0 bg-black opacity-95 z-1'></div>
        <p className='py-2 text-yellow-500 text-[1.2rem] relative z-10'>
            This is the beta version for our upcoming officlal Cab Booking system for SPLASH event.
        </p>
        <div className='flex flex-col items-center justify-center relative z-10'>
            <div className='w-full flex justify-center items-center border-b-4 border-white py-4'>
                <Image
                    className='py-2'
                    src='/support-img/phone-icon.png'
                    alt='support'
                    width={120}
                    height={120}
                    loading="lazy"
                    />
                <h1 className='py-2 uppercase font-bold text-[clamp(1.8rem,8vw,4.5rem)] text-yellow-500'>
                    Contact us!
                </h1>
            </div>
            <div className='py-4 text-[1.5rem]'>
                {ContactEmails.map((item) => (
                    <p
                        key={item.id}
                        className='py-[10px] mx-[10px] mb-[0.5rem] text-white text-[clamp(0.7rem,5vw,1.6rem)]'
                    >
                        {item.department}
                        <br />
                        <span 
                            className='
                                text-gray-500 underline
                                hover:text-yellow-500 hover:italic
                                transition-all
                            '
                        >
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                        </span>
                    </p>
                ))}
            </div>
        </div>
    </div>
  )
}

export default page
