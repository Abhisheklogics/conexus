import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { auth } from '../../../firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();
const socket = io('https://conbeckend.onrender.com');

const LobbyRoom = () => {
    const [roomId, setRoomId] = useState('');
    const [user, setUser] = useState(null); // For authenticated user
    const navigate = useNavigate();

    const login = () => {
     
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log('Logged in as:', result.user.displayName);
            })
            .catch((err) => {
                console.error('Error logging in:', err.message);
            });
    };

    const generateRoom = () => {
        if (!user) {
            alert("Please log in to generate a room!");
            return;
        }
        socket.emit('create-room', { email: user.email }, (response) => {
            if (response.success) {
                setRoomId(response.roomId);
                alert(`Room Code Generated: ${response.roomId}`);
            } else {
                alert("Failed to generate room!");
            }
        });
    };

    const joinRoom = () => {
        if (!user) {
            alert("Please log in to join a room!");
            return;
        }
        if (!roomId.trim()) {
            alert("Please enter a valid room code!");
            return;
        }
        navigate(`/room/${roomId}`, { state: { roomId, email: user.email } });
    };
    

    return (
        <div className="lobby-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            {!user ? (
                <>
                <button onClick={login} className="p-3 bg-blue-500 rounded">
                    Sign In with Google
                </button>
                <p className=' text-3xl font-bold text-white'>Video Calls and meetings for everyone</p>
                </>
            ) : (
                <div>
                    <p className="mb-4 text-green-400">Welcome, {user.displayName}!</p>
                    <button onClick={generateRoom} className="p-3 mb-4 bg-blue-500 rounded">
                        Generate Room Code
                    </button>
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
            )}
        </div>
    );
};

export default LobbyRoom;
