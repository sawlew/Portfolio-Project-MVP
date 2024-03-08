import React from 'react'
import { useEffect, useState } from 'react';
import Splash from '../component/Splash';
import Mainpage from '../component/Mainpage';

const Welcome=() => {
    const [showSplash, setShowSplash] = useState(true);
  
    useEffect(() => {
      const startUp = () => {
  
        // const intro = document.getElementById("intro");
        // const main = document.getElementById("main");
        const mainLogo = document.getElementById("mainLogo");
        const author = document.getElementById("author");
      
        mainLogo.classList.add("translate-y-[200px]");
        author.classList.add("translate-y-[130px]");
  
        setTimeout(() => {
          setShowSplash(false);
        }, 5000);
      };
      startUp();
    }, []);
  
    return (
      <>
        {showSplash ? (
          <Splash />
        ) : (
          <Mainpage />
        )}
      </>
    );
  };

export default Welcome