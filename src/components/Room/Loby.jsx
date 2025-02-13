import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

const Lobby = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const createNewMeeting = () => {
        const newRoomId = uuidV4(); // Generate unique room ID
        navigate(`/room/${newRoomId}`); // Redirect to new meeting
    };

    const joinMeeting = async () => {
        if (roomCode.trim() === "") {
            setError("⚠️ Please enter a valid room code!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/check-room/${roomCode}`);
            const data = await response.json();

            if (data.exists) {
                navigate(`/room/${roomCode}`);
            } else {
                setError("⚠️ Room does not exist. Please enter a valid code.");
            }
        } catch (err) {
            console.error("Error checking room:", err);
            setError("⚠️ Unable to verify room. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Google Meet Clone</h1>
            
            {/* New Meeting Button */}
            <button 
                className="bg-blue-500 px-6 py-3 rounded-lg text-white font-semibold mb-4 hover:bg-blue-600"
                onClick={createNewMeeting}
            >
                New Meeting
            </button>

            <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2">
                    {/* Input for Room Code */}
                    <input 
                        type="text"
                        className="px-4 py-2 border rounded-lg text-black"
                        placeholder="Enter meeting code"
                        value={roomCode}
                        onChange={(e) => {
                            setRoomCode(e.target.value);
                            setError(""); // Clear error on change
                        }}
                    />
                    
                    {/* Join Meeting Button */}
                    <button 
                        className="bg-green-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-green-600"
                        onClick={joinMeeting}
                    >
                        Join
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Lobby;
