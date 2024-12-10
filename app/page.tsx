export default function Home() {
    return (
        <div className="bg-black flex flex-col justify-center items-center h-[100vh]">
            <div className="w-[600px] h-[300px] bg-gradient-to-r from-yellow-400 to-yellow-800 rounded-lg p-5 text-black">
                <h1 className="font-bold mb-4 text-[24px]">Welcome to Splash Cab!</h1>
                <div className="p-1 mb-2">
                    <p className="text-[20px]">Client side/booking form demo is at:</p>
                    <a className='update-link text-[20px]' href="http://localhost:3000/client-app" target='_blank' rel="noopener noreferrer">
                    <span className="italic">http://localhost:3000/client-app/</span>
                    </a>
                </div>
                <div className="p-1 mb-2">
                    <p className="text-[20px]">Driver side/ ride info list demo is at:</p>
                    <a className='update-link text-[20px]' href="http://localhost:3000/driver-app" target='_blank' rel="noopener noreferrer">
                    <span className="italic">http://localhost:3000/driver-app/</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
