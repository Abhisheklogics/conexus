import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('https://conbeckend.onrender.com', { autoConnect: false });

const Room = () => {
    const { roomId } = useParams();
    const location = useLocation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!socket.connected) socket.connect();

        socket.emit('join-room', { roomId, Name: location.state?.userName });

        const updateUsers = (userList) => setUsers(userList);
        socket.on('update-user-list', updateUsers);

        return () => {
            socket.off('update-user-list', updateUsers);
        };
    }, [roomId, location.state]);

    return (
        <div className="room-container min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Room ID: {roomId}</h1>
            <h2 className="text-lg mb-4">Connected Users:</h2>
            <ul className="mb-4">
                {users.map((user) => (
                    <li key={user.id} className="text-green-400">{user.Name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Room;
