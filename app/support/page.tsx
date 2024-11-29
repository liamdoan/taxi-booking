import React from 'react';
import Image from 'next/image';

const page = () => {
  return (
    <div className='p-5'>
        <p className='py-2 font-semibold'>This is the beta version for our upcoming officlal ABC taxi for XYZ event.</p>
        <div className='flex justify-center'>
            <div className='w-[50%]'>
                <Image
                    className='py-2'
                    src='/support/phone-icon.png'
                    alt='support'
                    width={120}
                    height={120}
                    loading="lazy"
                    />
                <h1 className='py-2 font-bold text-[1.5rem]'>
                    Contact us!
                </h1>
                <p className='py-[2px]'>
                    General inquiries:&nbsp;
                    <span className='text-gray-500 underline'>
                        <a href="mailto:email@mycompany.com">email@mycompany.com</a>
                    </span>
                </p>
                <p className='py-[2px]'>
                    Technical support:&nbsp;
                    <span className='text-gray-500 underline'>
                        <a href="mailto:tech-support@mycompany.com">tech-support@mycompany.com</a>
                    </span>
                </p>
                <p className='py-[2px]'>
                    Partnership:&nbsp;
                    <span className='text-gray-500 underline'>
                        <a href="mailto:partners@mycompany.com">partners@mycompany.com</a>
                    </span>
                </p>
                <p className='py-[2px]'>
                    Media:&nbsp;
                    <span className='text-gray-500 underline'>
                        <a href="mailto:media@mycompany.com">media@mycompany.com</a>
                    </span>
                </p>
                <p className='py-[2px]'>
                    Marketing:&nbsp;
                    <span className='text-gray-500 underline'>
                        <a href="mailto:marketing@mycompany.com">marketing@mycompany.com</a>
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default page
