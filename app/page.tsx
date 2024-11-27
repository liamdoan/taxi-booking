import Image from "next/image";
import Booking from "@/components/booking-section/Booking";

export default function Home() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="bg-yellow-200">
                    <Booking />
                </div>
                <div className="bg-yellow-400 col-span-2">
                    map
                </div>
            </div>
        </div>
    );
}
