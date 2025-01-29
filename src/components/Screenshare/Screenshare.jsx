import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function Screenshare() {
  const [socket, setSocket] = useState(null);
  const [peerConnections, setPeerConnections] = useState({});
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const localStream = useRef(null);

  useEffect(() => {
    const newSocket = io("https://conbeckend.onrender.com/");
    setSocket(newSocket);

    newSocket.on("offer", async ({ id, description }) => {
      const pc = createPeerConnection(newSocket, id);
      await pc.setRemoteDescription(description);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      newSocket.emit("answer", { id, description: pc.localDescription });
    });

    newSocket.on("answer", ({ id, description }) => {
      peerConnections[id]?.setRemoteDescription(description);
    });

    newSocket.on("ice-candidate", ({ id, candidate }) => {
      peerConnections[id]?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    newSocket.on("stop-screen-sharing", () => {
      if (userVideo.current) userVideo.current.srcObject = null;
    });

    return () => newSocket.close();
  }, []);

  const createPeerConnection = (socket, id) => {
    const pc = new RTCPeerConnection();
    setPeerConnections((prev) => ({ ...prev, [id]: pc }));

    pc.ontrack = (event) => {
      if (userVideo.current) userVideo.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", { id, candidate: event.candidate });
      }
    };

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current);
      });
    }

    return pc;
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      localStream.current = stream;
      if (myVideo.current) myVideo.current.srcObject = stream;

      setIsScreenSharing(true);

      socket.emit("start-screen-sharing");

      socket.on("new-user", (id) => {
        const pc = createPeerConnection(socket, id);
        pc.createOffer().then((offer) => {
          pc.setLocalDescription(offer);
          socket.emit("offer", { id, description: offer });
        });
      });
    } catch (err) {
      console.error("Error starting screen sharing:", err);
    }
  };

  const stopScreenSharing = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
      if (myVideo.current) myVideo.current.srcObject = null;

      setIsScreenSharing(false);
      socket.emit("stop-screen-sharing");
    }
  };

  return (
    <div className="p-4 w-full bg-white">
      <div className="controls">
        <button
          onClick={isScreenSharing ? stopScreenSharing : startScreenSharing}
          className="bg-green-500 text-white p-2 rounded"
        >
          {isScreenSharing ? "Stop Screen Sharing" : "Start Screen Sharing"}
        </button>
      </div>

      <div>
        <h2>Your Screen Share</h2>
        <video ref={myVideo} playsInline muted autoPlay className="border" />
      </div>

      
    </div>
  );
}
