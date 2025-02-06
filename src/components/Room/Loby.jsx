import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://conbeckend.onrender.com', { autoConnect: false });

const LobbyRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [Name, setName] = useState('');
    const navigate = useNavigate();

    const JoinRoom = () => {
        socket.emit('join-room', { roomId, Name });
        navigate(`/room/${roomId}`, { state: { roomId, userName: Name } });
    };

    return (
        <div className="lobby-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <div>
                <input
                    type="text"
                    placeholder="Enter Room Code"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="p-3 mb-4 text-black"
                />
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 mb-4 ml-10 text-black"
                />
                <button onClick={JoinRoom} className="p-3 ml-10 bg-green-500 rounded">
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default LobbyRoom;
