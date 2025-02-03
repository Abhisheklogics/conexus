import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { io } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import { FaDesktop, FaPhoneSlash } from "react-icons/fa";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const name = location.state?.name || "Guest";
  const [screenStream, setScreenStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [users, setUsers] = useState([]);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const screenShareStreamRef = useRef(null);
  const currentScreenSharerRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("https://conbeckend.onrender.com/");
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", (id) => {
      socketRef.current.emit("join-room", { roomId, peerId: id, name });
    });

    peer.on("call", (call) => {
      call.answer();
      call.on("stream", (remoteStream) => {
        setScreenStream(remoteStream);
      });
    });

    socketRef.current.on("user-list", (userList) => {
      setUsers(userList);
    });

    socketRef.current.on("screen-share-update", ({ peerId, isSharing }) => {
      if (isSharing) {
        currentScreenSharerRef.current = peerId;
      } else {
        currentScreenSharerRef.current = null;
        setScreenStream(null);
      }
    });

    return () => {
      socketRef.current.emit("leave-room", { roomId, peerId: peerRef.current.id });
      socketRef.current.disconnect();
      peerRef.current.destroy();
    };
  }, [roomId]);

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenShareStreamRef.current.getTracks().forEach((track) => track.stop());
      setIsScreenSharing(false);
      socketRef.current.emit("screen-share-stopped", { roomId, peerId: peerRef.current.id });
    } else {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenShareStreamRef.current = screenStream;
        setScreenStream(screenStream);
        setIsScreenSharing(true);
        socketRef.current.emit("screen-share-started", { roomId, peerId: peerRef.current.id });

        Object.values(peerRef.current.connections).forEach((connections) => {
          connections.forEach((connection) => {
            const sender = connection.peerConnection.getSenders().find(s => s.track.kind === "video");
            if (sender) sender.replaceTrack(screenStream.getVideoTracks()[0]);
          });
        });

      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    }
  };

  const leaveRoom = () => {
    socketRef.current.emit("leave-room", { roomId, peerId: peerRef.current.id });
    socketRef.current.disconnect();
    peerRef.current.destroy();
    window.location.href = "/";
  };

  return (
    <div className="room-container min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Room Code: {roomId}</h1>
        <div className="flex space-x-4">
          <button onClick={toggleScreenShare} className={`p-2 rounded-lg ${isScreenSharing ? "bg-red-500" : "bg-blue-500"}`}>
            <FaDesktop className="text-white" />
          </button>
          <button onClick={leaveRoom} className="p-2 bg-red-500 rounded-lg">
            <FaPhoneSlash className="text-white" />
          </button>
        </div>
      </nav>

      <div className="p-4 bg-gray-700 text-white">
        <h2 className="text-lg font-semibold">Users in Room:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={roomId} className="text-sm">{user.name}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center min-h-screen">
        {screenStream ? (
          <video
            playsInline
            autoPlay
            controls
            className="w-full h-full object-cover"
            ref={(video) => {
              if (video) video.srcObject = screenStream;
            }}
          />
        ) : (
          <p className="text-xl">No screen sharing active</p>
        )}
      </div>
    </div>
  );
};

export default Room;
