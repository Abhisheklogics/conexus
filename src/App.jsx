
import Footer from './components/Footer/Footer'
import  Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

import { useEffect, useState } from 'react'

function App() {
  {/*
    
    useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    const disableShortcuts = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 67)) || // Ctrl+Shift+I or Ctrl+Shift+C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", disableRightClick);
    window.addEventListener("keydown", disableShortcuts);

    return () => {
      window.removeEventListener("contextmenu", disableRightClick);
      window.removeEventListener("keydown", disableShortcuts);
    };
  }, []);
  
    
    */}


  return (
   

   <>
   <Header/>
    <Outlet/>
    <Footer/>
   </> 
   
    
  )
}

export default App
