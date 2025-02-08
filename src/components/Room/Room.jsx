import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const socket = io('https://conbeckend.onrender.com');

const VideoChat = () => {
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const myVideoRef = useRef(null);
    const screenVideoRef = useRef(null);
    const myPeer = useRef(null);
    const peers = useRef({});
    const screenStreamRef = useRef(null);
    const myStreamRef = useRef(null);

    useEffect(() => {
        myPeer.current = new Peer();

        myPeer.current.on('open', (id) => {
            console.log(`🔗 My Peer ID: ${id}`);
            if (joined) {
                socket.emit('join-room', { roomId, userId: id });
            }
        });

        socket.on('user-connected', ({ userId }) => {
            console.log(`✅ User connected: ${userId}`);
            connectToNewUser(userId, myStreamRef.current);
        });

        socket.on('user-disconnected', (userId) => {
            if (peers.current[userId]) {
                peers.current[userId].close();
                delete peers.current[userId];
            }
            setRemoteStreams((streams) => streams.filter(({ id }) => id !== userId));
        });

        socket.on('screen-share-started', ({ userId }) => {
            console.log(`📺 Screen sharing started by: ${userId}`);
        });

        socket.on('screen-share-stopped', ({ userId }) => {
            console.log(`📺 Screen sharing stopped by: ${userId}`);
            if (screenVideoRef.current) {
                screenVideoRef.current.srcObject = null;
            }
        });

        return () => {
            socket.off('user-connected');
            socket.off('user-disconnected');
            socket.off('screen-share-started');
            socket.off('screen-share-stopped');
        };
    }, [joined, roomId]);

    const joinRoom = async () => {
        if (!roomId) return alert('⚠️ Please enter a Room ID');
        setJoined(true);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        myStreamRef.current = stream;

        if (myVideoRef.current) {
            myVideoRef.current.srcObject = stream;
        }

        myPeer.current.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userStream) => {
                setRemoteStreams((prevStreams) => {
                    if (prevStreams.find((s) => s.id === call.peer)) return prevStreams;
                    return [...prevStreams, { id: call.peer, stream: userStream }];
                });
            });
        });

        socket.emit('join-room', { roomId, userId: myPeer.current.id });
    };

    const connectToNewUser = (userId, stream) => {
        console.log(`📞 Calling new user: ${userId}`);
        const call = myPeer.current.call(userId, stream);

        call.on('stream', (userStream) => {
            setRemoteStreams((prevStreams) => {
                if (prevStreams.find((s) => s.id === userId)) return prevStreams;
                return [...prevStreams, { id: userId, stream: userStream }];
            });
        });

        call.on('close', () => {
            setRemoteStreams((prevStreams) => prevStreams.filter(({ id }) => id !== userId));
        });

        peers.current[userId] = call;
    };

    const toggleScreenShare = async () => {
        if (isScreenSharing) {
            screenStreamRef.current.getTracks().forEach((track) => track.stop());
            socket.emit('stop-screen-share', { roomId, userId: myPeer.current.id });
            setIsScreenSharing(false);
            return;
        }

        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screenStream;
        setIsScreenSharing(true);

        Object.values(peers.current).forEach((peer) => {
            peer.peerConnection.getSenders().forEach((sender) => {
                if (sender.track.kind === 'video') {
                    sender.replaceTrack(screenStream.getVideoTracks()[0]);
                }
            });
        });

        if (screenVideoRef.current) {
            screenVideoRef.current.srcObject = screenStream;
        }

        socket.emit('screen-share', { roomId, userId: myPeer.current.id });
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
                    <div id="video-grid" className="grid grid-cols-2 gap-4 p-4">
                        <video ref={myVideoRef} muted autoPlay playsInline className="w-[200px] h-[200px] bg-gray-800 rounded-md"></video>
                        {remoteStreams.map(({ id, stream }) => (
                            <video key={id} autoPlay playsInline className="w-[200px] h-[200px] bg-gray-800 rounded-md"
                                ref={(video) => {
                                    if (video && !video.srcObject) video.srcObject = stream;
                                }}>
                            </video>
                        ))}
                        <video ref={screenVideoRef} autoPlay playsInline className="w-[400px] h-[300px] bg-gray-900 rounded-md"></video>
                    </div>
                    <button onClick={toggleScreenShare} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
                        {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoChat;
