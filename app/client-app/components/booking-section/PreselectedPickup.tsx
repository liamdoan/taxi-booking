import React, { useState } from 'react'

const PreselectedPickup = () => {
    const [tickedPickupOption, setTickedPickupOption] = useState('');
    const [tickedDropOption, setTickedDropOption] = useState('');

    const handleCheckBoxChange = (e: any, type: 'pickup' | 'drop') => {
        if (type === 'pickup') {
            const {id} = e.target;

            if (tickedPickupOption === id) {
                setTickedPickupOption('');
            } else {
                setTickedPickupOption(id);
            }
        } else {
            const {id} = e.target;

            if (tickedDropOption === id) {
                setTickedDropOption('');
            } else {
                setTickedDropOption(id);
            }
        };
    };

    return (
        <div>
            <h1 className='text-gray-400 mt-3 italic'>
                Or choose from preselected pickup point:
            </h1>
            <div className='flex flex-wrap justify-between'>
                <div>
                    <label
                        htmlFor="pickup-airport-address"
                        className='
                            text-white
                            py-2 my-1 mr-6
                            flex flex-row items-center
                            cursor-pointer
                        '
                    >
                        <input
                            id='pickup-airport-address'
                            type="checkbox"
                            checked={tickedPickupOption === 'pickup-airport-address'}
                            onChange={(e) => handleCheckBoxChange(e, 'pickup')}
                            className='
                                mr-4
                                appearance-none
                                w-[30px] h-[30px]
                                border-2 border-white
                                rounded-md
                                cursor-pointer
                                checked:bg-yellow-500
                            '
                        />
                        Helsinki-Vantaa Airport
                    </label>
                </div>
                <div>
                    <label
                        htmlFor="pickup-venue-address"
                        className='
                            text-white
                            py-2 my-1
                            flex flex-row items-center
                            cursor-pointer
                        '
                    >
                        <input
                            id='pickup-venue-address'
                            type="checkbox"
                            checked={tickedPickupOption === 'pickup-venue-address'}
                            onChange={(e) => handleCheckBoxChange(e, 'pickup')}
                            className='
                                mr-4
                                appearance-none
                                w-[30px] h-[30px]
                                border-2 border-white
                                rounded-md
                                cursor-pointer
                                checked:bg-yellow-500
                            '
                        />
                        Messukeskus Special Entrance
                    </label>
                </div>
            </div>
        </div>
    )
}

export default PreselectedPickup
