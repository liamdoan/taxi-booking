'use client';

import React, { useEffect, useState } from 'react';
import { SuggestedAddressList, UserLocationCoordinates } from '@/app/shared/utils/types';
import { useHasSelectedAddressContext, useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import { useHasFetchTravelingRouteDataSuccessfullyContext } from '@/app/shared/context/TravelingRouteDataContext';
import Image from 'next/image';
import { useUserLocation } from '@/app/shared/context/UserLocationContext';
import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import { useGetAddressData } from '@/app/shared/utils/getSingleAddressData';

const AutoSearchAddress = () => {
    const [suggestedPickupAddressList, setSuggestedPickupAddressList] = useState<any>([]);
    const [suggestedDropAddressList, setSuggestedDropAddressList] = useState<any>([])

    const [showPickupYourLocationOption, setShowPickupYourLocationOption] = useState<boolean>(false);
    const [showDropYourLocationOption, setShowDropYourLocationOption] = useState<boolean>(false);

    const [isCallGetSuggestedAddresses, setIsCallGetSuggestedAddresses] = useState(true);

    const {userLocation} = useUserLocation();
    const {hasSelectedAddress, setHasSelectedAddress} = useHasSelectedAddressContext();
    const {setHasFetchTravelingRouteDataSuccessfully} = useHasFetchTravelingRouteDataSuccessfullyContext();
    const {
        pickupAddressFromInput,
        setPickupAddressFromInput,
        dropAddressFromInput,
        setDropAddressFromInput
    } = useAddressNameContext();
    const {
        setPickupCoordinate,
        setDropCoordinate
    } = useInputCoordsContext();

    const { getAddressData } = useGetAddressData();

    const [tickedPickupOption, setTickedPickupOption] = useState('');
    const [tickedDropOption, setTickedDropOption] = useState('');

    const showYourLocationOption = (address: string, type: 'pickup' | 'drop') => {
        if (type === 'pickup'){
            if (!address || address.trim() === "") {
                setShowPickupYourLocationOption(true);
            } else {
                setShowPickupYourLocationOption(false);
            }
        } else {
            if (!address || address.trim() === "") {
                setShowDropYourLocationOption(true);
            } else {
                setShowDropYourLocationOption(false);
            }
        }
    };

    const onYourLocationClick = (coords: UserLocationCoordinates, type: 'pickup' | 'drop') => {
        if (type === 'pickup') {
            setPickupCoordinate({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            getAddressData(coords.latitude, coords.longitude, 'pickup');
            setIsCallGetSuggestedAddresses(false);
        } else {
            setDropCoordinate({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            getAddressData(coords.latitude, coords.longitude, 'drop');
            setIsCallGetSuggestedAddresses(false);
        }
    };

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
        };

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
        if (!isCallGetSuggestedAddresses) return;

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
            setPickupCoordinate({
                latitude: item.lat,
                longitude: item.lon
            })
        } else {
            setDropAddressFromInput(item.display_name);
            setSuggestedDropAddressList([]);
            setHasSelectedAddress(true);
            setDropCoordinate({
                latitude: item.lat,
                longitude: item.lon
            })
        }
    };

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
        <div className='p-1'>
            <div className='mb-4'>
                <div
                    id="pickup-input"
                    className='pt-2 pb-2 relative'
                >
                    <label className='text-[var(--text-normal)] flex items-start'>
                        <Image src="/location-pin-img/pin-red.png" alt='pin-red' width={20} height={10} className='mr-1'/>
                        Pickup location&nbsp;<span className='text-red-500'>*</span>
                    </label>
                    <input
                        type="text"
                        className='bg-transparent text-[var(--text-normal)] border-[1px] mt-2 p-3 w-full rounded-md outline-none focus:bg-[var(--input-focus)] transition-all'
                        value={pickupAddressFromInput}
                        onFocus={() => showYourLocationOption(pickupAddressFromInput, 'pickup')}
                        onBlur={() => {
                            setShowPickupYourLocationOption(false)
                            setSuggestedPickupAddressList([])
                        }}
                        onChange={e => {
                            showYourLocationOption(e.target.value, 'pickup')
                            setPickupAddressFromInput(e.target.value);
                            setHasSelectedAddress(false);
                            setHasFetchTravelingRouteDataSuccessfully(false);
                            setIsCallGetSuggestedAddresses(true)
                        }}
                    />
                    {suggestedPickupAddressList ?
                        <div className='absolute z-20 bg-white w-full shadow-md rounded-md'>
                            {showPickupYourLocationOption && (
                                <p
                                    className='p-2 hover:bg-gray-200 cursor-pointer'
                                    onMouseDown={() => onYourLocationClick(userLocation, 'pickup')}
                                >
                                    Your location
                                </p>
                            )}
                            {suggestedPickupAddressList?.map((item: SuggestedAddressList) => (
                                <p
                                    key={item.place_id}
                                    className='p-2 hover:bg-gray-200 cursor-pointer'
                                    onMouseDown={() => onAddressInputClick(item, 'pickup')}
                                >
                                    {item.display_name}
                                </p>
                            ))}
                        </div>
                        : null
                    }
                </div>
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
            </div>
            <div>
                <div
                    id="dropping-input"
                    className='pt-2 pb-2 relative'
                >
                    <label className='text-[var(--text-normal)] flex items-start'>
                        <Image src="/location-pin-img/pin-green.png" alt='pin-red' width={20} height={10} className='mr-1'/>
                        Dropping location&nbsp;<span className='text-red-500'>*</span>
                    </label>
                    <input
                        type="text"
                        className='bg-transparent text-[var(--text-normal)] border-[1px] mt-2 p-3 w-full rounded-md outline-none focus:bg-[var(--input-focus)] transition-all'
                        value={dropAddressFromInput}
                        onFocus={() => showYourLocationOption(dropAddressFromInput, 'drop')}
                        onBlur={() => {
                            setShowDropYourLocationOption(false)
                            setSuggestedDropAddressList([])
                        }}
                        onChange={e => {
                            showYourLocationOption(e.target.value, 'drop')
                            setDropAddressFromInput(e.target.value);
                            setHasSelectedAddress(false);
                            setHasFetchTravelingRouteDataSuccessfully(false);
                            setIsCallGetSuggestedAddresses(true)

                        }}
                    />
                    {suggestedDropAddressList ?
                        <div className='absolute z-10 bg-white w-full shadow-md rounded-md'>
                            {showDropYourLocationOption && (
                                <p
                                    className='p-2 hover:bg-gray-200 cursor-pointer'
                                    onMouseDown={() => onYourLocationClick(userLocation, 'drop')}
                                >
                                    Your location
                                </p>
                            )}
                            {suggestedDropAddressList?.map((item: SuggestedAddressList) => (
                                <p
                                    key={item.place_id}
                                    className='p-2 hover:bg-gray-200 cursor-pointer'
                                    onMouseDown={() => onAddressInputClick(item, 'drop')}
                                >
                                    {item.display_name}
                                </p>
                            ))}
                        </div>
                        : null
                    }
                </div>
                <div>
                    <h1 className='text-gray-400 mt-3 italic'>
                        Or choose from preselected dropping point:
                    </h1>
                    <div className='flex flex-wrap justify-between'>
                        <div>
                            <label
                                htmlFor="drop-venue-address"
                                className='
                                    text-white
                                    py-2 my-1 mr-6
                                    flex flex-row items-center
                                    cursor-pointer
                                '
                            >
                                <input
                                    id='drop-venue-address'
                                    type="checkbox"
                                    checked={tickedDropOption === 'drop-venue-address'}
                                    onChange={(e) => handleCheckBoxChange(e, 'drop')}
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
                        <div>
                            <label
                                htmlFor="drop-airport-address"
                                className='
                                    text-white
                                    py-2 my-1
                                    flex flex-row items-center
                                    cursor-pointer
                                '
                            >
                                <input
                                    id='drop-airport-address'
                                    type="checkbox"
                                    checked={tickedDropOption === 'drop-airport-address'}
                                    onChange={(e) => handleCheckBoxChange(e, 'drop')}
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoSearchAddress

//https://my.locationiq.com/dashboard#playground
