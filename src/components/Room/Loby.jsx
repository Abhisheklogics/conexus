import React, { useState ,useRef } from 'react';

import { io } from 'socket.io-client';

import Peer from 'peerjs';



const LobbyRoom = () => {
    const [roomId, setRoomId] = useState('');
    const socket = io('http://localhost:4000/');
      const [stream, setStream] = useState();
    let socketRef=useRef()
   socketRef.current=socket
      const peerRef = useRef(null);

   

      
        
    

    const joinRoom = () => {
       const peer =new Peer()
       peerRef.current = peer;
       peerRef.current.on('open',(id)=>{
        socketRef.current.emit('join-room',{roomId,id})
       
       })
     navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
     }).then((stream)=>{
 setStream(stream)
 socketRef.current.on('user-connected',(roomId)=>{

 })
     })
    };
    

    return (
        <>
        <div className="lobby-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            
          
                <div>
                    <p className="mb-4 text-green-400">Welcome,</p>
                  
                    <input
                        type="text"
                        placeholder="Enter Room Code"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="p-3 mb-4 text-black"
                    />
                    <button onClick={joinRoom} className="p-3 bg-green-500 rounded">
                        Join Room
                    </button>
                </div>
               
        </div>
        <video
                playsInline
                autoPlay
                controls
                className="w-[300px] object-contain"
                ref={(video) => {
                  if (video) video.srcObject = stream;
                }}
              />
         </>
    );
};

export default LobbyRoom;
