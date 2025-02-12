import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const socket = io('https://conbeckend.onrender.com');

const VideoChat = () => {
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');
    const [joined, setJoined] = useState(false);
    const [users, setUsers] = useState([]);
    const [screenSharer, setScreenSharer] = useState(null);

    const screenVideoRef = useRef(null);
    const myPeer = useRef(null);
    const peers = useRef({});
    const myStreamRef = useRef(null);
    const screenStreamRef = useRef(null);

    useEffect(() => {
        myPeer.current = new Peer();

        myPeer.current.on('open', (id) => {
            if (joined) {
                socket.emit('join-room', { roomId, userId: id, name });
            }
        });

        socket.on('user-list', (userList) => {
            setUsers(userList);
        });

        socket.on('screen-share-started', ({ userId }) => {
            setScreenSharer(userId);
        });

        socket.on('connect-screen-share', ({ screenSharer }) => {
            if (myPeer.current && myPeer.current.id !== screenSharer) {
                const call = myPeer.current.call(screenSharer, myStreamRef.current);
                call.on('stream', (screenStream) => {
                    if (screenVideoRef.current) {
                        screenVideoRef.current.srcObject = screenStream;
                    }
                });
                peers.current[screenSharer] = call;
            }
        });

        socket.on('screen-share-stopped', () => {
            setScreenSharer(null);
            if (screenVideoRef.current) {
                screenVideoRef.current.srcObject = null;
            }
        });

        socket.on('user-disconnected', (userId) => {
            if (peers.current[userId]) {
                peers.current[userId].close();
                delete peers.current[userId];
            }
        });
    }, [joined, roomId]);

    const joinRoom = async () => {
        if (!roomId || !name) return alert('Please enter Room ID and Name');
        setJoined(true);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        myStreamRef.current = stream;

        myPeer.current.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userStream) => {
                if (screenVideoRef.current) {
                    screenVideoRef.current.srcObject = userStream;
                }
            });
        });

        socket.emit('join-room', { roomId, userId: myPeer.current.id, name });
    };

    const toggleScreenShare = async () => {
        if (screenSharer && screenSharer !== myPeer.current.id) {
            alert('Another user is already sharing their screen!');
            return;
        }

        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            screenStreamRef.current = screenStream;
            setScreenSharer(myPeer.current.id);

            socket.emit('screen-share', { roomId, userId: myPeer.current.id });

            Object.keys(peers.current).forEach((userId) => {
                const call = myPeer.current.call(userId, screenStream);
                call.on('stream', (userStream) => {
                    if (screenVideoRef.current) {
                        screenVideoRef.current.srcObject = userStream;
                    }
                });
            });

            if (screenVideoRef.current) {
                screenVideoRef.current.srcObject = screenStream;
            }

            screenStream.getVideoTracks()[0].onended = () => {
                stopScreenShare();
            };
        } catch (error) {
            console.error("Error sharing screen:", error);
        }
    };

    const stopScreenShare = () => {
        if (screenStreamRef.current) {
            screenStreamRef.current.getTracks().forEach(track => track.stop());
            screenStreamRef.current = null;
        }
        setScreenSharer(null);
        socket.emit('stop-screen-share', { roomId, userId: myPeer.current.id });
    };

    return (
        <div className="flex flex-col items-center p-4">
            {!joined ? (
                <div className="flex flex-col items-center space-y-3">
                    <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="border p-2 rounded-md" />
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-md" />
                    <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded-md">Join Room</button>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Room ID: {roomId}</h2>
                    <video ref={screenVideoRef} autoPlay playsInline className="w-[400px] h-[300px] bg-gray-900 rounded-md"></video>
                    <button onClick={toggleScreenShare} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">Share Screen</button>
                </div>
            )}
        </div>
    );
};

export default VideoChat;
