'use client';

import React, { useEffect, useState } from 'react';
import { SuggestedAddressList } from '@/app/utils/types';
import { useHasSelectedAddressContext, useInputCoordsContext } from '@/app/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/context/TravelingRouteDataContext';

const AutoSearchAddress = () => {
    const [pickupAddressFromInput, setPickupAddressFromInput] = useState<any>('');
    const [suggestedPickupAddressList, setSuggestedPickupAddressList] = useState<any>([])

    const [dropAddressFromInput, setDropAddressFromInput] = useState<any>('');
    const [suggestedDropAddressList, setSuggestedDropAddressList] = useState<any>([])

    const {hasSelectedAddress, setHasSelectedAddress} = useHasSelectedAddressContext();
    const {setHasFetchTravelingRouteDataSuccessfully} = useHasFetchTravelingRouteDataSuccessfullyContext();

    const {
        setPickupCoordinate,
        setDropCoordinate
    } = useInputCoordsContext();

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

    //currently no need for this, might be used full for dropping point
    // const getAddressData = async (latitude: number, longitude: number) => {
    //     try {
    //         const res = await fetch('/api/address-get?lat=' + latitude + '&lon=' + longitude);
    //         const addressData = await res.json();

    //     }catch(err) {
    //         console.error("Error getting address data", err)
    //     }
    // };

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

    const onAddressInputClick = (item: any, type: 'pickup' | 'drop') => {
        if (type === 'pickup') {
            setPickupAddressFromInput(item.display_name);
            setSuggestedPickupAddressList([]);
            setHasSelectedAddress(true);
            // getAddressData(item.lat, item.lon);
            setPickupCoordinate({
                latitude: item.lat,
                longitude: item.lon
            })
        } else {
            setDropAddressFromInput(item.display_name);
            setSuggestedDropAddressList([]);
            setHasSelectedAddress(true);
            // getAddressData(item.lat, item.lon);
            setDropCoordinate({
                latitude: item.lat,
                longitude: item.lon
            })
        }
    };

    return (
        <div className='p-1'>
            <div
                id="pickup-input"
                className='pt-2 pb-2 relative'
            >
                <label className='text-[var(--text-normal)]'>Pickup location&nbsp;<span className='text-red-500'>*</span></label>
                <input
                    type="text"
                    className='bg-transparent text-[var(--text-normal)] border-[1px] mt-2 p-3 w-full rounded-md outline-none focus:bg-[var(--input-focus)] transition-all'
                    value={pickupAddressFromInput}
                    onChange={e => {
                        setPickupAddressFromInput(e.target.value);
                        setHasSelectedAddress(false);
                        setHasFetchTravelingRouteDataSuccessfully(false);
                    }}
                />
                {suggestedPickupAddressList ?
                    <div className='absolute z-10 bg-white w-full shadow-md rounded-md'>
                        {suggestedPickupAddressList?.map((item: SuggestedAddressList) => (
                            <p
                                key={item.place_id}
                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => onAddressInputClick(item, 'pickup')}
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
                className='pt-2 pb-2'
            >
                <label className='text-[var(--text-normal)]'>Dropping location&nbsp;<span className='text-red-500'>*</span></label>
                <input
                    type="text"
                    className='bg-transparent text-[var(--text-normal)] border-[1px] mt-2 p-3 w-full rounded-md outline-none focus:bg-[var(--input-focus)] transition-all'
                    value={dropAddressFromInput}
                    onChange={e => {
                        setDropAddressFromInput(e.target.value);
                        setHasSelectedAddress(false);
                        setHasFetchTravelingRouteDataSuccessfully(false);
                    }}
                />
                {suggestedDropAddressList ?
                    <div className=' bg-white w-full shadow-md rounded-md'>
                        {suggestedDropAddressList?.map((item: SuggestedAddressList) => (
                            <p
                                key={item.place_id}
                                className='p-2 hover:bg-gray-200 cursor-pointer'
                                onClick={() => onAddressInputClick(item, 'drop')}
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
