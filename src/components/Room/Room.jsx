import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";

const socket = io("https://conbeckend.onrender.com"); // Change to backend URL

const App = () => {
  const [peerId, setPeerId] = useState(null);
  const [screenSharer, setScreenSharer] = useState(null);
  const myPeer = useRef(null);
  const screenVideoRef = useRef(null);
  const screenStreamRef = useRef(null);

  useEffect(() => {
    myPeer.current = new Peer(undefined, {
      host: "https://conbeckend.onrender.com",
      path: "/peerjs",
      secure: false,
    });

    myPeer.current.on("open", (id) => {
      setPeerId(id);
    });

    myPeer.current.on("call", (call) => {
      call.answer();
      call.on("stream", (stream) => {
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
      });
    });

    socket.on("screen-share-started", ({ peerId }) => {
      setScreenSharer(peerId);
      const call = myPeer.current.call(peerId, null);
      call.on("stream", (stream) => {
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
      });
    });

    socket.on("screen-share-stopped", () => {
      setScreenSharer(null);
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = null;
      }
    });
  }, []);

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = screenStream;
      socket.emit("start-screen-share", { peerId });

      myPeer.current.on("call", (call) => {
        call.answer(screenStream);
      });

      screenStream.getVideoTracks()[0].onended = stopScreenShare;
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenShare = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    socket.emit("stop-screen-share");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-lg font-bold mb-4">PeerJS Screen Sharing</h1>
      {!screenSharer ? (
        <button onClick={startScreenShare} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Start Screen Share
        </button>
      ) : (
        <button onClick={stopScreenShare} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Stop Screen Share
        </button>
      )}
      <video ref={screenVideoRef} autoPlay playsInline className="border mt-4"></video>
    </div>
  );
};

export default App;
