import React from 'react'

const AutoSearchAddress = () => {
  return (
    <div className='p-5 bg-yellow-400'>
        <div className=' bg-yellow-500 pt-2 pb-2'>
            <label htmlFor="">Pickup location</label>
            <input 
                type="text"
                className='border-[1px] p-1 w-full rounded-md outline-none focus:bg-gray-200 transition-all'
            />
        </div>
        <div className='bg-yellow-600 pt-2 pb-2'>
            <label htmlFor="">Dropping location</label>
            <input 
                type="text"
                className='border-[1px] p-1 w-full rounded-md outline-none focus:bg-gray-200 transition-all'
            />
        </div>
    </div>
  )
}

export default AutoSearchAddress