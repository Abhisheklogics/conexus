


import React from "react";
import { NavLink } from "react-router-dom";
export default function HomeFirst() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-900 to-white text-gray-800">
     

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-24 py-20 gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            Effortless <span className="text-indigo-600">Conexus&nbsp;Meet</span> for your team
          </h1>
          <p className="text-lg md:text-xl md:ml-[250px] text-gray-600 mb-8 max-w-xl">
            Meet, share your screen, and collaborate with up to 50 participants—no downloads required. Secure, fast, and built for modern remote work.
          </p>
          <div className="flex gap-4 flex-wrap">
            <NavLink to='/room'    className={({ isActive }) => (isActive ? "text-red-500 " : "text-white px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg transition-all")}>
Live Class
 </NavLink>
           
          </div>
        </div>
      
      </section>

      {/* Features */}
      
      {/* Footer */}
     
    </main>
  );
}

// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
// import { io } from 'socket.io-client';
// import { useParams, useLocation } from 'react-router-dom';
// import { FaMicrophone, FaMicrophoneAltSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

// const Room = () => {
//   const { roomId } = useParams();
//   const location = useLocation();
//   const [streams, setStreams] = useState({});
//   const [localStream, setLocalStream] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const peerRef = useRef(null);
//   const socketRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const screenShareStreamRef = useRef(null);
//   const { email: userEmail } = location.state || {};
//   const firstUserRef = useRef(null); // Track the first user

//   useEffect(() => {
//     socketRef.current = io('https://conbeckend.onrender.com/');
//     const peer = new Peer();
//     peerRef.current = peer;

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localStreamRef.current = stream;
//       setLocalStream(stream);

//       peer.on('open', (id) => {
//         socketRef.current.emit('join-room', { roomId, peerId: id, email: userEmail });
//         setStreams((prev) => ({ ...prev, [id]: { stream } }));

//         // Mark the first user
//         if (!firstUserRef.current) {
//           firstUserRef.current = id; // Store the first user's peerId
//         }
//       });

//       peer.on('call', (call) => {
//         call.answer(stream);
//         call.on('stream', (remoteStream) => {
//           setStreams((prev) => ({ ...prev, [call.peer]: { stream: remoteStream } }));
//         });
//       });
//     });

//     socketRef.current.on('user-connected', ({ peerId }) => {
//       const call = peer.call(peerId, localStreamRef.current);
//       call.on('stream', (remoteStream) => {
//         setStreams((prev) => ({ ...prev, [peerId]: { stream: remoteStream } }));
//       });
//     });

//     socketRef.current.on('user-disconnected', ({ peerId }) => {
//       setStreams((prev) => {
//         const updatedStreams = { ...prev };
//         delete updatedStreams[peerId];
//         return updatedStreams;
//       });
//     });

//     return () => {
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       if (socketRef.current) {
//         socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
//         socketRef.current.disconnect();
//       }
//       if (peerRef.current) {
//         peerRef.current.destroy();
//       }
//     };
//   }, [roomId]);

//   const toggleMute = () => {
//     const audioTrack = localStreamRef.current.getAudioTracks()[0];
//     audioTrack.enabled = !audioTrack.enabled;
//     setIsMuted(!audioTrack.enabled);
//   };

//   const toggleVideo = () => {
//     const videoTrack = localStreamRef.current.getVideoTracks()[0];
//     videoTrack.enabled = !videoTrack.enabled;
//     setIsVideoOff(!videoTrack.enabled);
//   };

//   const toggleScreenShare = async () => {
//     if (isScreenSharing) {
//       // Stop the screen share stream
//       if (screenShareStreamRef.current) {
//         screenShareStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       // Restore the local stream video if it exists
//       if (localStreamRef.current) {
//         const videoTrack = localStreamRef.current.getVideoTracks()[0];
//         if (videoTrack) videoTrack.enabled = true;  // Make sure the video track exists before enabling
//         setStreams((prev) => ({
//           ...prev,
//           [peerRef.current.id]: { stream: localStreamRef.current },
//         }));
//       }
//       setIsScreenSharing(false);
//       socketRef.current.emit('screen-share-stopped', { roomId, peerId: peerRef.current.id });
//     } else {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         screenShareStreamRef.current = screenStream;
  
//         // Stop the local video track if it's active
//         if (localStreamRef.current) {
//           const localVideoTracks = localStreamRef.current.getVideoTracks();
//           if (localVideoTracks.length > 0) {
//             localVideoTracks.forEach((track) => track.stop());  // Stop each track
//           }
//         }
  
//         setStreams((prev) => ({
//           ...prev,
//           [peerRef.current.id]: { stream: screenStream },
//         }));
//         setIsScreenSharing(true);
//         socketRef.current.emit('screen-share-started', { roomId, peerId: peerRef.current.id, stream: screenStream });
//       } catch (err) {
//         console.error('Error sharing screen:', err);
//       }
//     }
//   };
  
  

//   const leaveRoom = () => {
//     socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
//     localStreamRef.current.getTracks().forEach((track) => track.stop());
//     peerRef.current.destroy();
//     socketRef.current.disconnect();
//     window.location.href = '/';
//   };

//   return (
//     <div className="room-container min-h-screen bg-gray-900 text-white flex flex-col">
//       <nav className="bg-gray-800 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Room Code: {roomId}</h1>
//         <div className="flex space-x-4">
//           <button onClick={toggleMute} className={`p-2 rounded-lg ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}>
//             {isMuted ? <FaMicrophoneAltSlash className="text-white" /> : <FaMicrophone className="text-white" />}
//           </button>
//           <button onClick={toggleVideo} className={`p-2 rounded-lg ${isVideoOff ? 'bg-red-500' : 'bg-green-500'}`}>
//             {isVideoOff ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
//           </button>
//           <button onClick={toggleScreenShare} className={`p-2 rounded-lg ${isScreenSharing ? 'bg-red-500' : 'bg-blue-500'}`}>
//             <FaDesktop className="text-white" />
//           </button>
//           <button onClick={leaveRoom} className="p-2 bg-red-500 rounded-lg">
//             <FaPhoneSlash className="text-white" />
//           </button>
//         </div>
//       </nav>
//       <div className="flex-grow p-8">
//         <div className="grid grid-cols-5 gap-4">
//           {Object.entries(streams).map(([id, { stream }]) => (
//             <div key={id} className="relative border border-gray-700 rounded-lg overflow-hidden">
//               {id == firstUserRef.current ? ( // Check if it's the first user
//                 <video
//                   playsInline
//                   autoPlay
//                   controls
//                   muted={id === peerRef.current.id} 
//                   ref={(video) => {
//                     if (video && stream) {
//                       video.srcObject = stream;
//                     }
//                   }}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <video
//                   playsInline
//                   autoPlay
//                   muted={id === peerRef.current.id} 
//                   ref={(video) => {
//                     if (video && stream) {
//                       video.srcObject = stream;
//                     }
//                   }}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//               <p className="absolute bottom-1 left-1 bg-black bg-opacity-75 text-xs px-2 py-1 rounded">
//                 {id === peerRef.current.id ? 'You' : id}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Room;
// import React, { useEffect, useRef, useState } from 'react';
// import Peer from 'peerjs';
// import { io } from 'socket.io-client';
// import { useParams, useLocation } from 'react-router-dom';
// import { FaMicrophone, FaMicrophoneAltSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

// const Room = () => {
//   const { roomId } = useParams();
//   const location = useLocation();
//   const [streams, setStreams] = useState({});
//   const [localStream, setLocalStream] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
//   const peerRef = useRef(null);
//   const socketRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const screenShareStreamRef = useRef(null);
//   const savedStreamsRef = useRef({});
//   const { email: userEmail } = location.state || {};
  
//   useEffect(() => {
//     socketRef.current = io('https://conbeckend.onrender.com/');
//     const peer = new Peer();
//     peerRef.current = peer;

//     navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//       localStreamRef.current = stream;
//       setLocalStream(stream);

//       peer.on('open', (id) => {
//         socketRef.current.emit('join-room', { roomId, peerId: id, email: userEmail });
//         setStreams((prev) => ({ ...prev, [id]: { stream } }));
//       });

//       peer.on('call', (call) => {
//         call.answer(stream);
//         call.on('stream', (remoteStream) => {
//           setStreams((prev) => ({ ...prev, [call.peer]: { stream: remoteStream } }));
//         });
//       });
//     });

//     socketRef.current.on('user-connected', ({ peerId }) => {
//       const call = peer.call(peerId, localStreamRef.current);
//       call.on('stream', (remoteStream) => {
//         setStreams((prev) => ({ ...prev, [peerId]: { stream: remoteStream } }));
//       });
//     });

//     socketRef.current.on('user-disconnected', ({ peerId }) => {
//       setStreams((prev) => {
//         const updatedStreams = { ...prev };
//         delete updatedStreams[peerId];
//         return updatedStreams;
//       });
//     });

//     return () => {
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       if (socketRef.current) {
//         socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
//         socketRef.current.disconnect();
//       }
//       if (peerRef.current) {
//         peerRef.current.destroy();
//       }
//     };
//   }, [roomId]);

//   const toggleMute = () => {
//     const audioTrack = localStreamRef.current.getAudioTracks()[0];
//     audioTrack.enabled = !audioTrack.enabled;
//     setIsMuted(!audioTrack.enabled);
//   };

//   const toggleVideo = () => {
//     const videoTrack = localStreamRef.current.getVideoTracks()[0];
//     videoTrack.enabled = !videoTrack.enabled;
//     setIsVideoOff(!videoTrack.enabled);
//   };

//   const toggleScreenShare = async () => {
//     if (isScreenSharing) {
//       if (screenShareStreamRef.current) {
//         screenShareStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//       Object.values(peerRef.current.connections).forEach((connections) => {
//         connections.forEach((connection) => {
//           const sender = connection.peerConnection.getSenders().find(s => s.track.kind === 'video');
//           if (sender) sender.replaceTrack(localStreamRef.current.getVideoTracks()[0]);
//         });
//       });

//       setStreams(savedStreamsRef.current);
//       savedStreamsRef.current = {};
//       setIsScreenSharing(false);
//     } else {
//       try {
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//         screenShareStreamRef.current = screenStream;

//         savedStreamsRef.current = { ...streams };

//         Object.values(peerRef.current.connections).forEach((connections) => {
//           connections.forEach((connection) => {
//             const sender = connection.peerConnection.getSenders().find(s => s.track.kind === 'video');
//             if (sender) sender.replaceTrack(screenStream.getVideoTracks()[0]);
//           });
//         });

//         setStreams({
//           [peerRef.current.id]: { stream: screenStream }
//         });

//         setIsScreenSharing(true);
//       } catch (err) {
//         console.error('Error sharing screen:', err);
//       }
//     }
//   };

//   const leaveRoom = () => {
//     socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
//     localStreamRef.current.getTracks().forEach((track) => track.stop());
//     peerRef.current.destroy();
//     socketRef.current.disconnect();
//     window.location.href = '/';
//   };

//   return (
//     <div className="room-container min-h-screen bg-gray-900 text-white flex flex-col">
//       <nav className="bg-gray-800 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold">Room Code: {roomId}</h1>
//         <div className="flex space-x-4">
//           <button onClick={toggleMute} className={`p-2 rounded-lg ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}>
//             {isMuted ? <FaMicrophoneAltSlash className="text-white" /> : <FaMicrophone className="text-white" />}
//           </button>
//           <button onClick={toggleVideo} className={`p-2 rounded-lg ${isVideoOff ? 'bg-red-500' : 'bg-green-500'}`}>
//             {isVideoOff ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
//           </button>
//           <button onClick={toggleScreenShare} className={`p-2 rounded-lg ${isScreenSharing ? 'bg-red-500' : 'bg-blue-500'}`}>
//             <FaDesktop className="text-white" />
//           </button>
//           <button onClick={leaveRoom} className="p-2 bg-red-500 rounded-lg">
//             <FaPhoneSlash className="text-white" />
//           </button>
//         </div>
//       </nav>

//         <div className={`flex grid gap-4`}>
//           {Object.entries(streams).map(([id, { stream }]) => (
//             <div
//               key={id}
//               className={` w-[200px] h-36 border border-gray-700 rounded-lg overflow-hidden bg-black`}
//             >
//               <video
//                 playsInline
//                 autoPlay
//                 controls
//                 className="w-full h-full object-cover"
//                 ref={(video) => {
//                   if (video) video.srcObject = stream;
//                 }}
//               />
//               <p className="absolute bottom-2 left-2 bg-gray-800 text-white px-2 py-1 rounded">{id}</p>
//             </div>
//           ))}
//         </div>

      
//     </div>
//   );
// };

// export default Room;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
// import { auth } from '../../../firebase';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// const provider = new GoogleAuthProvider();
// const socket = io('https://conbeckend.onrender.com/');

// const LobbyRoom = () => {
//     const [roomId, setRoomId] = useState('');
//     const [user, setUser] = useState(null); // For authenticated user
//     const navigate = useNavigate();

//     const login = () => {
     
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 setUser(result.user);
//                 console.log('Logged in as:', result.user.displayName);
//             })
//             .catch((err) => {
//                 console.error('Error logging in:', err.message);
//             });
//     };

//     const generateRoom = () => {
//         if (!user) {
//             alert("Please log in to generate a room!");
//             return;
//         }
//         socket.emit('create-room', { email: user.email }, (response) => {
//             if (response.success) {
//                 setRoomId(response.roomId);
//                 alert(`Room Code Generated: ${response.roomId}`);
//             } else {
//                 alert("Failed to generate room!");
//             }
//         });
//     };

//     const joinRoom = () => {
//         if (!user) {
//             alert("Please log in to join a room!");
//             return;
//         }
//         if (!roomId.trim()) {
//             alert("Please enter a valid room code!");
//             return;
//         }
//         navigate(`/room/${roomId}`, { state: { roomId, email: user.email } });
//     };
    

//     return (
//         <div className="lobby-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
//             {!user ? (
//                 <>
//                 <button onClick={login} className="p-3 bg-blue-500 rounded">
//                     Sign In with Google
//                 </button>
//                 <p className=' text-3xl font-bold text-white'>Video Calls and meetings for everyone</p>
//                 </>
//             ) : (
//                 <div>
//                     <p className="mb-4 text-green-400">Welcome, {user.displayName}!</p>
//                     <button onClick={generateRoom} className="p-3 mb-4 bg-blue-500 rounded">
//                         Generate Room Code
//                     </button>
//                     <input
//                         type="text"
//                         placeholder="Enter Room Code"
//                         value={roomId}
//                         onChange={(e) => setRoomId(e.target.value)}
//                         className="p-3 mb-4 text-black"
//                     />
//                     <button onClick={joinRoom} className="p-3 bg-green-500 rounded">
//                         Join Room
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LobbyRoom;
// // ---------------------- SERVER SIDE (Express + Socket.io) ----------------------


// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import dotenv from 'dotenv';
// import cors from 'cors';

// dotenv.config();
// const app = express();

// app.use(cors({
//     origin: ['https://conexus-meet.vercel.app/'],
//     methods: ['GET', 'POST'],
//     credentials: true,
// }));

// const server = createServer(app);
// const io = new Server(server, { cors: true });

// let rooms = {}; // Store room details and connected users
// let activeScreenSharers = {}; // Track active screen sharers in each room

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Create room
//     socket.on('create-room', ({ email }, callback) => {
//         const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
//         rooms[roomId] = [{ socketId: socket.id, email }];
//         callback({ success: true, roomId });
//         console.log(`Room ${roomId} created by ${email}`);
//     });

//     // Join room
//     socket.on('join-room', ({ roomId, peerId, email }) => {
//         if (!rooms[roomId]) rooms[roomId] = [];
//         rooms[roomId].push({ socketId: socket.id, peerId, email });

//         socket.join(roomId);
//         socket.to(roomId).emit('user-connected', { peerId, email });

//         const existingUsers = rooms[roomId].filter((user) => user.socketId !== socket.id);
//         socket.emit('receive-existing-users', { existingUsers });

//         socket.roomId = roomId;
//         socket.peerId = peerId;
//         socket.email = email;

//         console.log(`${email} joined room ${roomId}`);
//     });

//     // Start screen sharing
//     socket.on('screen-share-started', ({ roomId, peerId }) => {
//         if (!activeScreenSharers[roomId]) {
//             activeScreenSharers[roomId] = peerId;
//             io.to(roomId).emit('screen-share-update', { peerId, isSharing: true });
//             console.log(`Screen sharing started by ${peerId} in room ${roomId}`);
//         } else {
//             socket.emit('error-message', { message: 'Screen sharing is already active!' });
//         }
//     });

//     // Stop screen sharing
//     socket.on('screen-share-stopped', ({ roomId, peerId }) => {
//         if (activeScreenSharers[roomId] === peerId) {
//             delete activeScreenSharers[roomId];
//             io.to(roomId).emit('screen-share-update', { peerId, isSharing: false });
//             console.log(`Screen sharing stopped by ${peerId} in room ${roomId}`);
//         }
//     });

//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
        
//         for (let roomId in rooms) {
//             const roomUsers = rooms[roomId];
//             const userIndex = roomUsers.findIndex(user => user.socketId === socket.id);
//             if (userIndex !== -1) {
//                 const { peerId, email } = roomUsers[userIndex];
//                 rooms[roomId].splice(userIndex, 1);
//                 socket.to(roomId).emit('user-disconnected', { peerId, email });
                
//                 if (activeScreenSharers[roomId] === peerId) {
//                     delete activeScreenSharers[roomId];
//                     io.to(roomId).emit('screen-share-update', { peerId, isSharing: false });
//                 }
//                 break;
//             }
//         }
//     });
// });

// server.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });
// 