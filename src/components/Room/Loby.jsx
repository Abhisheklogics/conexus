import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LobbyRoom() {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const nav = useNavigate();

  const submit = e => {
    e.preventDefault();
    if (!roomId || !name) return alert('Fill both fields');
    nav(`/room/${roomId}`, { state: { roomId, name, role } });
  };

  return (
    <form onSubmit={submit} className="flex flex-col items-center justify-center min-h-screen gap-3 text-white">
      <input placeholder="Room ID" value={roomId} onChange={e => setRoomId(e.target.value)} className="p-2 text-black" />
      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} className="p-2 text-black" />
      <select value={role} onChange={e => setRole(e.target.value)} className="p-2 text-black">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button className="bg-green-500 px-4 py-2 rounded">Join</button>
    </form>
  );
}
