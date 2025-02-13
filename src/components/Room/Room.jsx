import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Peer from "peerjs";

const VideoChat = () => {
    const { roomId } = useParams(); 
    const socket = useRef(io("http://localhost:4000"));
    const peer = useRef(new Peer());

    const videoRef = useRef();
    const peers = useRef({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Join room
        socket.current.emit("join-room", roomId, peer.current.id);

        peer.current.on("open", (id) => {
            console.log("My Peer ID:", id);
        });

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;

                // Handle user connection
                socket.current.on("user-connected", (userId) => {
                    console.log(`User ${userId} joined`);
                    connectToNewUser(userId, stream);
                });

                peer.current.on("call", (call) => {
                    call.answer(stream);
                    call.on("stream", (userStream) => {
                        setUsers((prev) => [...prev, { id: call.peer, stream: userStream }]);
                    });
                });

                socket.current.on("user-disconnected", (userId) => {
                    console.log(`User ${userId} disconnected`);
                    setUsers((prev) => prev.filter((user) => user.id !== userId));
                    if (peers.current[userId]) {
                        peers.current[userId].close();
                    }
                });
            });

        return () => {
            socket.current.disconnect();
            peer.current.destroy();
        };
    }, [roomId]);

    const connectToNewUser = (userId, stream) => {
        const call = peer.current.call(userId, stream);
        call.on("stream", (userStream) => {
            setUsers((prev) => [...prev, { id: userId, stream: userStream }]);
        });
        peers.current[userId] = call;
    };

    return (
        <div>
            <h2>Room ID: {roomId}</h2>
            <video ref={videoRef} autoPlay muted height="200px" width="300px" />
            {users.map((user) => (
                <video key={user.id} autoPlay height="200px" width="300px" 
                    ref={(el) => el && (el.srcObject = user.stream)} 
                />
            ))}
        </div>
    );
};

export default VideoChat;
