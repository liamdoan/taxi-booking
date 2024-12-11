import { useAddressNameContext } from "../context/AddressNameContext";
import { useHasSelectedAddressContext } from "../context/InputCoordsContext";

export const useGetAddressData = () => {
    const {setHasSelectedPickupAddress, setHasSelectedDropAddress} = useHasSelectedAddressContext();
    const {
        setPickupAddressFromInput,
        setDropAddressFromInput
    } = useAddressNameContext();

    const getAddressData = async (latitude: number, longitude: number, type: 'pickup' | 'drop') => {
        try {
            const res = await fetch('/api/address-get?lat=' + latitude + '&lon=' + longitude);
            const addressData = await res.json();
    
            if (type === 'pickup' && res.status == 200) {
                setHasSelectedPickupAddress(true);
            };

            if (type === 'drop' && res.status == 200) {
                setHasSelectedDropAddress(true);
            };
    
            if (type === 'pickup') {
                setPickupAddressFromInput(addressData.display_name);
            } else if (type === 'drop') {
                setDropAddressFromInput(addressData.display_name);
            };
        } catch(err) {
            console.error("Error getting address data", err)
        }
    };

    return { getAddressData };
}
