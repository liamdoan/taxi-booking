import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import { useCheckBoxContext } from '@/app/shared/context/CheckBoxContext';
import { useHasSelectedAddressContext, useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import React from 'react'

const PreselectedPickup = () => {
    const {
        tickedPickupOptionCheckbox,
        setTickedPickupOptionCheckbox,
        tickedDropOptionCheckbox,
        setTickedDropOptionCheckbox
    } = useCheckBoxContext(); 

    const {setPickupAddressFromInput} = useAddressNameContext();
    const {setHasSelectedPickupAddress} = useHasSelectedAddressContext();

    const {setPickupCoordinate} = useInputCoordsContext();

    const airportFullAddress = 'Helsinki-Vantaan lentoasema, Ilmakehä, Aviapolis, Veromies, Vantaa, Uusimaa, Manner-Suomi, 01530, Suomi';
    const airportLabel = 'Helsinki-Vantaa Airport';
    const airportCoordinates = [60.3189332, 24.9682958];

    const venueFullAddress = 'Messukeskus, Rautatieläisenkatu, Itä-Pasila, Pasila, Helsinki, Uusimaa, Manner-Suomi, 00077, Suomi';
    const venueLabel = 'Messukeskus Pasila';
    const venueCoordinates = [60.2014151, 24.93669568];

    const handleCheckBoxChange = (e: any, type: 'pickup' | 'drop') => {
        if (type === 'pickup') {
            const {id} = e.target;

            if (tickedPickupOptionCheckbox === id) {
                setTickedPickupOptionCheckbox('');
                setPickupAddressFromInput('');
            } else {
                setTickedPickupOptionCheckbox(id);

                if (id === 'pickup-airport-address') {
                    setPickupAddressFromInput(airportFullAddress);

                    setPickupCoordinate({
                        latitude: airportCoordinates[0],
                        longitude:  airportCoordinates[1]
                    });
                } else if (id === 'pickup-venue-address') {
                    setPickupAddressFromInput(venueFullAddress);

                    setPickupCoordinate({
                        latitude: venueCoordinates[0],
                        longitude:  venueCoordinates[1]
                    });
                }
                setHasSelectedPickupAddress(true);
            }
        } else {
            const {id} = e.target;

            if (tickedDropOptionCheckbox === id) {
                setTickedDropOptionCheckbox('');
            } else {
                setTickedDropOptionCheckbox(id);
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
                            checked={tickedPickupOptionCheckbox === 'pickup-airport-address'}
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
                        {airportLabel}
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
                            checked={tickedPickupOptionCheckbox === 'pickup-venue-address'}
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
                        {venueLabel}
                    </label>
                </div>
            </div>
        </div>
    )
}

export default PreselectedPickup
