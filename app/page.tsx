export default function Home() {
    return (
        <div className="bg-black flex flex-col justify-center items-center h-[100vh]">
            <div className="w-[500px] h-[200px] bg-gradient-to-r from-yellow-400 to-yellow-800 rounded-lg p-5 text-black">
                <h1>Thank you for stopping by</h1>
                <p>client side of this app is at:</p>
                <a  className='update-link' href="http://localhost:3000/client-app" target='_blank' rel="noopener noreferrer">
                http://localhost:3000/client-app/
                </a>
            </div>
        </div>
    );
}
