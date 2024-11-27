'use client';

import React, { useEffect, useState } from 'react';
import { SuggestedAddressList } from '@/app/utils/types';

const AutoSearchAddress = () => {
    const [pickupAddressFromInput, setPickupAddressFromInput] = useState<any>('');
    const [suggestedPickupAddressList, setSuggestedPickupAddressList] = useState<any>([]);

    const [dropAddressFromInput, setDropAddressFromInput] = useState<any>('');
    const [suggestedDropAddressList, setSuggestedDropAddressList] = useState<any>([]);

    const [hasSelectedAddress, setHasSelectedAddress] = useState<boolean>(false);

    const getSuggestedAddresses = async (address: string, type: 'pickup' | 'drop') => {
        if (!address || address.trim() === "" || hasSelectedAddress) {
            // Currently with API from LocationIQ, if input is undefined/null/space,
            // the call is still made. It leads to the suggestion for those values,
            // which might be from API's default behaviour for empty queries.
            if (type === 'pickup') {
                setSuggestedPickupAddressList([]);
            } else {
                setSuggestedDropAddressList([]);
            }

            return;
        }

        try {
            const res = await fetch('/api/address-search?q=' + address);
            const result = await res.json();

            if (type === 'pickup') {
                setSuggestedPickupAddressList(result);
            } else {
                setSuggestedDropAddressList(result);
            }
        } catch(err) {
            console.error("Error fetching addresses: ", err)
        }
    };

    // handle pickup input change
    useEffect(() => {
        const timer = setTimeout(() => {
            if (pickupAddressFromInput) {
                getSuggestedAddresses(pickupAddressFromInput, 'pickup');
            } else {
                setSuggestedPickupAddressList([]);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [pickupAddressFromInput]);

    // handle dropping input change
    useEffect(() => {
        const timer = setTimeout(() => {
            if (dropAddressFromInput) {
                getSuggestedAddresses(dropAddressFromInput, 'drop');
            } else {
                setSuggestedDropAddressList([]);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [dropAddressFromInput]);

    return (
        <div className='p-5 bg-yellow-400'>
            <div
                id="pickup-input"
                className=' bg-yellow-500 pt-2 pb-2 relative'
            >
                <label>Pickup location</label>
                <input
                    type="text"
                    className='border-[1px] p-1 w-full rounded-md outline-none focus:bg-gray-200 transition-all'
                    value={pickupAddressFromInput}
                    onChange={e => {
                        setPickupAddressFromInput(e.target.value);
                        setHasSelectedAddress(false);
                    }}
                />
                {suggestedPickupAddressList ?
                    <div className='absolute bg-white w-full shadow-md rounded-md'>
                        {suggestedPickupAddressList?.map((item: SuggestedAddressList) => (
                            <p
                                key={item.place_id}
                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => {
                                    setPickupAddressFromInput(item.display_name);
                                    setSuggestedPickupAddressList([]);
                                    setHasSelectedAddress(true)
                                }}
                            >
                                {item.display_name}
                            </p>
                        ))}
                    </div>
                    : null
                }
            </div>
            <div
                id="dropping-input"
                className='bg-yellow-600 pt-2 pb-2'
            >
                <label htmlFor="">Dropping location</label>
                <input
                    type="text"
                    className='border-[1px] p-1 w-full rounded-md outline-none focus:bg-gray-200 transition-all'
                    value={dropAddressFromInput}
                    onChange={e => {
                        setDropAddressFromInput(e.target.value);
                        setHasSelectedAddress(false);
                    }}
                />
                {suggestedDropAddressList ?
                    <div className=' bg-white w-full shadow-md rounded-md'>
                        {suggestedDropAddressList?.map((item: SuggestedAddressList) => (
                            <p
                                key={item.place_id}
                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => {
                                    setDropAddressFromInput(item.display_name);
                                    setSuggestedDropAddressList([]);
                                    setHasSelectedAddress(true)
                                }}
                            >
                                {item.display_name}
                            </p>
                        ))}
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default AutoSearchAddress

//https://my.locationiq.com/dashboard#playground
