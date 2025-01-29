import { useAddressNameContext } from '@/app/shared/context/AddressNameContext';
import { useCheckBoxContext } from '@/app/shared/context/CheckBoxContext';
import { useHasSelectedAddressContext, useInputCoordsContext } from '@/app/shared/context/InputCoordsContext';
import React from 'react';

const PreselectedDrop = () => {
    const {
        tickedPickupOptionCheckbox,
        setTickedPickupOptionCheckbox,
        tickedDropOptionCheckbox,
        setTickedDropOptionCheckbox,
    } = useCheckBoxContext();

    const { setDropAddressFromInput } = useAddressNameContext();
    const { setHasSelectedDropAddress } = useHasSelectedAddressContext();

    const { setDropCoordinate } = useInputCoordsContext();

    const airportFullAddress =
        'Helsinki-Vantaan lentoasema, Ilmakehä, Aviapolis, Veromies, Vantaa, Uusimaa, Manner-Suomi, 01530, Suomi';
    const airportLabel = 'Helsinki-Vantaa Airport';
    const airportCoordinates = [60.3189332, 24.9682958];

    const venueFullAddress =
        'Messukeskus, Rautatieläisenkatu, Itä-Pasila, Pasila, Helsinki, Uusimaa, Manner-Suomi, 00077, Suomi';
    const venueLabel = 'Messukeskus Pasila';
    const venueCoordinates = [60.2014151, 24.93669568];

    const handleCheckBoxChange = (e: any, type: 'pickup' | 'drop') => {
        if (type === 'pickup') {
            const { id } = e.target;

            if (tickedPickupOptionCheckbox === id) {
                setTickedPickupOptionCheckbox('');
            } else {
                setTickedPickupOptionCheckbox(id);
            }
        } else {
            const { id } = e.target;

            if (tickedDropOptionCheckbox === id) {
                setTickedDropOptionCheckbox('');
                setDropAddressFromInput('');
            } else {
                setTickedDropOptionCheckbox(id);

                if (id === 'drop-airport-address') {
                    setDropAddressFromInput(airportFullAddress);

                    setDropCoordinate({
                        latitude: airportCoordinates[0],
                        longitude: airportCoordinates[1],
                    });
                } else if (id === 'drop-venue-address') {
                    setDropAddressFromInput(venueFullAddress);

                    setDropCoordinate({
                        latitude: venueCoordinates[0],
                        longitude: venueCoordinates[1],
                    });
                }
                setHasSelectedDropAddress(true);
            }
        }
    };

    return (
        <div>
            <h1 className="text-gray-400 mt-3 italic">Or choose from preselected dropping point:</h1>
            <div className="flex flex-wrap justify-between">
                <div>
                    <label
                        htmlFor="drop-venue-address"
                        className="
                            text-white
                            py-2 my-1 mr-6
                            flex flex-row items-center
                            cursor-pointer
                        "
                    >
                        <input
                            id="drop-venue-address"
                            type="checkbox"
                            checked={tickedDropOptionCheckbox === 'drop-venue-address'}
                            onChange={(e) => handleCheckBoxChange(e, 'drop')}
                            className="
                                mr-4
                                appearance-none
                                w-[30px] h-[30px]
                                border-2 border-white
                                rounded-md
                                cursor-pointer
                                checked:bg-yellow-500
                            "
                        />
                        {venueLabel}
                    </label>
                </div>
                <div>
                    <label
                        htmlFor="drop-airport-address"
                        className="
                            text-white
                            py-2 my-1
                            flex flex-row items-center
                            cursor-pointer
                        "
                    >
                        <input
                            id="drop-airport-address"
                            type="checkbox"
                            checked={tickedDropOptionCheckbox === 'drop-airport-address'}
                            onChange={(e) => handleCheckBoxChange(e, 'drop')}
                            className="
                                mr-4
                                appearance-none
                                w-[30px] h-[30px]
                                border-2 border-white
                                rounded-md
                                cursor-pointer
                                checked:bg-yellow-500
                            "
                        />
                        {airportLabel}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default PreselectedDrop;
