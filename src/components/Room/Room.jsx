import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";

const socket = io("https://conbeckend.onrender.com");

const VideoChat = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [screenSharer, setScreenSharer] = useState(null);
  
  const screenVideoRef = useRef(null);
  const myPeer = useRef(new Peer());
  const peers = useRef({});
  const screenStreamRef = useRef(null);

  useEffect(() => {
    myPeer.current.on("open", (id) => {
      if (joined) {
        socket.emit("join-room", { roomId, userId: id, name });
      }
    });

    socket.on("screen-share-started", ({ userId }) => {
      setScreenSharer(userId);
      if (myPeer.current.id !== userId) {
        requestScreenStream(userId);
      }
    });

    socket.on("screen-share-stopped", () => {
      setScreenSharer(null);
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = null;
      }
    });

    socket.on("user-disconnected", (userId) => {
      if (peers.current[userId]) {
        peers.current[userId].close();
        delete peers.current[userId];
      }
    });
  }, [joined, roomId]);

  const joinRoom = () => {
    if (!roomId || !name) return alert("Please enter Room ID and Name");
    setJoined(true);
    socket.emit("join-room", { roomId, userId: myPeer.current.id, name });
  };

 const toggleScreenShare = async () => {
    if (screenSharer && screenSharer !== myPeer.current.id) {
        alert("Another user is already sharing their screen!");
        return;
    }

    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screenStream;
        setScreenSharer(myPeer.current.id);
        socket.emit("screen-share", { roomId, userId: myPeer.current.id });

        // **Set the screen stream for the sharer**
        if (screenVideoRef.current) {
            screenVideoRef.current.srcObject = screenStream;
        }

        screenStream.getVideoTracks()[0].onended = () => {
            stopScreenShare();
        };
    } catch (error) {
        console.error("Error sharing screen:", error);
    }
};

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
      screenStreamRef.current = null;
    }
    setScreenSharer(null);
    socket.emit("stop-screen-share", { roomId, userId: myPeer.current.id });
  };

  const requestScreenStream = (screenSharerId) => {
    if (myPeer.current.id !== screenSharerId) {
      const conn = myPeer.current.connect(screenSharerId);
      conn.on("open", () => {
        conn.send("request-screen");
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {!joined ? (
        <div className="flex flex-col items-center space-y-3">
          <input type="text" placeholder="Enter Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="border p-2 rounded-md" />
          <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded-md" />
          <button onClick={joinRoom} className="bg-blue-500 text-white px-4 py-2 rounded-md">Join Room</button>
        </div>
      ) : (
        <div>
          <video ref={screenVideoRef} autoPlay playsInline></video>
          <button onClick={toggleScreenShare}>Share Screen</button>
        </div>
      )}
    </div>
  );
};

export default VideoChat;
