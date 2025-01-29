import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Screenshare from '../Screenshare/Screenshare';
export default function Automation() {
  const [socket, setSocket] = useState(null); 
  const [receivedUrl, setReceivedUrl] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

 
 

  useEffect(() => {
    const newSocket = io( 'https://conbeckend.onrender.com/'); 
    setSocket(newSocket);

    newSocket.on("receive-url", (url) => {
      console.log("URL received from server:", url);
      setReceivedUrl(url); 
    });

    newSocket.on("receive-mouse-position", (position) => {
      console.log("Received mouse position:", position);
      setMousePosition(position); 
    });

    return () => newSocket.close();
  }, []);

  const sendUrlToServer = (url) => {
    const urlToSend = url;
    if (socket) {
      socket.emit("send-url", { url: urlToSend }); 
      setReceivedUrl(urlToSend); 
      console.log("URL sent to server:", urlToSend);
    } else {
      console.error("Socket is not connected.");
    }
  };

  const handleMouseMove = (e) => {
    const position = { x: e.clientX, y: e.clientY };
    if (socket) {
      socket.emit("send-mouse-position", position); 
     
    }
  };

  return (
    <div 
      className="p-4 w-full bg-white"
      onMouseMove={handleMouseMove} 
    >
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => sendUrlToServer("https://sarkitshala.site/")}
      >
        Sarkitshala
      </button>

      <div className={`${receivedUrl ? "block" : "hidden md:absolute "} `}>
        <button
          className="bg-blue-500 text-white md:ml-28 ml-24 absolute mt-[-40px] p-2 rounded"
          onClick={() => sendUrlToServer("https://sarkitshala.site/arduino")}
        >
          Arduino
        </button>
      
        <button
          className="bg-blue-500 text-white  absolute mt-[-40px] md:ml-[209px] ml-[180px] p-2 rounded"
          onClick={() => sendUrlToServer("https://sarkitshala.site/raspberry")}
        >
          Raspberry Pi
        </button>

        <button
          className="bg-blue-500 text-white  absolute md:ml-[326px] mt-[-40px] w-20 p-2 ml-[295px] rounded"
          onClick={() => sendUrlToServer("https://sarkitshala.site/esp")}
        >
          Esp
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          top: mousePosition.y,
          left: mousePosition.x,
          width: "10px",
          height: "10px",
          backgroundColor: "black",
          borderRadius: "50%",
          pointerEvents: "none", 
          zIndex: 1000, 
        }}
      ></div>

      {receivedUrl && (
        <iframe
          src={receivedUrl}
          className="w-full h-[1100px] mt-4 border border-gray-300"
          title="Broadcasted URL"
        ></iframe>
      )}
       <Screenshare/>
    </div>
  );
}
