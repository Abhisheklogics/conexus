import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const socket = io('https://conbeckend.onrender.com'); // Adjust backend URL if needed

const VideoChat = () => {
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState([]);

    const myVideoRef = useRef(null);
    const videoGridRef = useRef(null);
    const myPeer = useRef(null);
    const peers = useRef({});

    useEffect(() => {
        myPeer.current = new Peer(); // Initialize PeerJS

        myPeer.current.on('open', (id) => {
            console.log(`🔗 My Peer ID: ${id}`);
            if (joined) {
                socket.emit('join-room', roomId, id);
            }
        });

        socket.on('user-connected', (userId) => {
            console.log(`✅ User connected: ${userId}`);
            if (myVideoRef.current && myVideoRef.current.srcObject) {
                connectToNewUser(userId, myVideoRef.current.srcObject);
            }
        });

        socket.on('user-disconnected', (userId) => {
            if (peers.current[userId]) {
                peers.current[userId].close();
                delete peers.current[userId];
            }
            setRemoteStreams((streams) => streams.filter((stream) => stream.userId !== userId));
        });

        return () => {
            socket.off('user-connected');
            socket.off('user-disconnected');
        };
    }, [joined, roomId]);

    const joinRoom = async () => {
        if (!roomId) return alert('⚠️ Please enter a Room ID');
        setJoined(true);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
        }

        myPeer.current.on('call', (call) => {
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', (userStream) => {
                addVideoStream(video, userStream);
            });
        });

        socket.emit('join-room', roomId, myPeer.current.id);
    };

    const connectToNewUser = (userId, stream) => {
        console.log(`📞 Calling new user: ${userId}`);
        const call = myPeer.current.call(userId, stream);
        const video = document.createElement('video');

        call.on('stream', (userStream) => {
            addVideoStream(video, userStream);
        });

        call.on('close', () => {
            video.remove();
        });

        peers.current[userId] = call;
    };

    const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '200px';
        video.style.margin = '10px';
        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        videoGridRef.current.append(video);
    };

    return (
        <div className="flex flex-col items-center p-4">
            {!joined ? (
                <div className="flex flex-col items-center space-y-3">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Join Room
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <h2 className="text-xl font-semibold">Room ID: {roomId}</h2>
                    <div ref={videoGridRef} id="video-grid" className="grid grid-cols-2 gap-4 p-4">
                        <video ref={myVideoRef} muted autoPlay playsInline className="w-[200px] h-[200px] bg-gray-800 rounded-md"></video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoChat;
