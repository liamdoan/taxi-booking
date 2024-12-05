import { useAddressNameContext } from "../context/AddressNameContext";
import { useHasSelectedAddressContext } from "../context/InputCoordsContext";

export const useGetAddressData = () => {
    const {setHasSelectedAddress} = useHasSelectedAddressContext();
    const {
        setPickupAddressFromInput,
        setDropAddressFromInput
    } = useAddressNameContext();

    const getAddressData = async (latitude: number, longitude: number, type: 'pickup' | 'drop') => {
        try {
            const res = await fetch('/api/address-get?lat=' + latitude + '&lon=' + longitude);
            const addressData = await res.json();
    
            if (res.status == 200) {
                setHasSelectedAddress(true);
            };
    
            type === 'pickup' && setPickupAddressFromInput(addressData.display_name);
            type === 'drop' && setDropAddressFromInput(addressData.display_name);
        } catch(err) {
            console.error("Error getting address data", err)
        }
    };

    return { getAddressData };
}
