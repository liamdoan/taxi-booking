import Image from "next/image";
import Booking from "@/components/booking-section/Booking";
import MapLibre from "@/components/map-section/MapLibre";

export default function Home() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-yellow-200">
                    <Booking />
                </div>
                <div className="bg-yellow-400 col-span-2">
                <MapLibre />
                </div>
            </div>
        </div>
    );
}
