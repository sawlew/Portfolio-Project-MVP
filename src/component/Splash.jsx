import React from 'react';
import mainLogo from '../assets/unzipitbysawlew.png';

const Splash = () => {
  return (
    <div>
        <div id="intro" className="relative h-screen w-full overflow-hidden">
            <div className="absolute z-20 w-full flex flex-col items-center">
                <img id="mainLogo" className="absolute top-[-200px] duration-500 ease-linear" src={mainLogo} alt />
                <p id="author" className="font-bold absolute top-[-20px] duration-1000 ease-linear text-[#364A79]">EXTRACT YOUR ZIP FILE WITH EASE</p>
            </div>
            <dotlottie-player className="absolute z-10" src="https://lottie.host/a5da9340-e190-4050-915f-991c2be0bcfa/EIdxxMTJ1q.json" background="#98b5b2" speed="1.5" style={{width: '100%', height: '100vh'}} direction={1} loop autoPlay />
        </div>
    </div>
  )
}

export default Splash