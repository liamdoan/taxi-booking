export default function Home() {
    return (
        <div className="bg-black flex flex-col justify-center items-center h-[100vh]">
            <div className="w-[600px] h-[300px] bg-gradient-to-r from-yellow-400 to-yellow-800 rounded-lg p-5 text-black">
                <h1 className="font-bold mb-4 text-[24px]">Welcome to SPLASH Cab!</h1>
                <div className="p-1 mb-2 text-[20px]">
                    <p>Client side/booking form demo is at:</p>
                    <a className='update-link hover:text-[21px] transition-all' href="https://splash-cab-booking.vercel.app/client-app" target='_blank' rel="noopener noreferrer">
                    <span className="italic">https://splash-cab-booking.vercel.app/client-app/</span>
                    </a>
                    <p>Access code: <span className="font-bold">2024</span></p>
                </div>
                <div className="p-1 mb-2 text-[20px]">
                    <p>Driver side/ride info list demo is at:</p>
                    <a className='update-link hover:text-[21px] transition-all' href="https://splash-cab-booking.vercel.app/driver-app" target='_blank' rel="noopener noreferrer">
                    <span className="italic">https://splash-cab-booking.vercel.app/driver-app/</span>
                    </a>
                    <p>Access code: <span className="font-bold">4202</span></p>
                </div>
            </div>
        </div>
    );
}
