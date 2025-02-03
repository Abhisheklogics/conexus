import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://conbeckend.onrender.com/");

const LobbyRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (!roomId.trim()) {
      alert("Please enter a valid Room ID!");
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    navigate(`/room/${roomId}`, { state: { roomId, name } });
  };

  return (
    <div className="lobby-container flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Online Class Video Meet</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 mb-4 text-black"
      />
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
  );
};

export default LobbyRoom;
