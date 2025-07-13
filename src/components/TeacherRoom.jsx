import React, { useEffect, useRef, useState } from "react";
import { makeSocket } from "../lib/socket";

export default function TeacherRoom({ roomId, name }) {
  const localVideoRef   = useRef();
  const cameraStreamRef = useRef();    
  const screenStreamRef = useRef();     
  const peersRef        = useRef({});   
  const socketRef       = useRef();
  const [sharing, setSharing] = useState(false);

 
  useEffect(() => {
    const socket = makeSocket({ role: "teacher", roomId, name });
    socketRef.current = socket;
    socket.emit("join-room", { roomId, role: "teacher", name });

    navigator.mediaDevices
      .getUserMedia({ video: { width: 640 }, audio: true })
      .then((camStream) => {
        cameraStreamRef.current = camStream;
        localVideoRef.current.srcObject = camStream;

     
        socket.on("student-joined", ({ studentId }) =>
          createConnectionFor(studentId, camStream)
        );

    
        socket.on("answer", ({ from, sdp }) =>
          peersRef.current[from]?.pc.setRemoteDescription(sdp)
        );
        socket.on("ice", ({ from, candidate }) =>
          candidate && peersRef.current[from]?.pc.addIceCandidate(candidate)
        );
        socket.on("student-left", ({ studentId }) => closePeer(studentId));
      });

    return () => {
      socket.disconnect();
      Object.values(peersRef.current).forEach(({ pc }) => pc.close());
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [roomId, name]);


  const createConnectionFor = async (studentId, stream) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    const videoSender = pc.addTrack(stream.getVideoTracks()[0], stream);
    stream.getAudioTracks().forEach((t) => pc.addTrack(t, stream));

    pc.onicecandidate = ({ candidate }) =>
      candidate && socketRef.current.emit("ice", { to: studentId, candidate });

    peersRef.current[studentId] = { pc, videoSender };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.emit("offer", { to: studentId, sdp: pc.localDescription });
  };

  const closePeer = (id) => {
    peersRef.current[id]?.pc.close();
    delete peersRef.current[id];
  };

  
  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStreamRef.current = screenStream;
      replaceVideoTrack(screenStream.getVideoTracks()[0]);
      localVideoRef.current.srcObject = screenStream;
      setSharing(true);

      screenStream.getVideoTracks()[0].addEventListener("ended", stopScreenShare);
    } catch (err) {
      console.error("Screen share error:", err);
    }
  };

  const stopScreenShare = () => {
    if (!sharing) return;
    screenStreamRef.current.getTracks().forEach((t) => t.stop());
    replaceVideoTrack(cameraStreamRef.current.getVideoTracks()[0]);
    localVideoRef.current.srcObject = cameraStreamRef.current;
    setSharing(false);
  };

  const replaceVideoTrack = (newTrack) => {
    Object.values(peersRef.current).forEach(({ videoSender }) =>
      videoSender.replaceTrack(newTrack)
    );
  };

 
  return (
    <section className="flex flex-col items-center gap-4 p-4 text-white">
      <header className="flex items-center gap-3">
        <span className="text-xl font-semibold">Teacher:</span>
        <span className="px-3 py-1 rounded-full bg-emerald-600">{name}</span>
        <span className="ml-3 px-2 py-0.5 text-xs rounded bg-red-500 animate-pulse">
          LIVE
        </span>
        <button
          onClick={sharing ? stopScreenShare : startScreenShare}
          className={`ml-6 px-4 py-2 rounded-lg text-sm transition-colors ${
            sharing
              ? "bg-red-600 hover:bg-red-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {sharing ? "Stop sharing" : "Share screen"}
        </button>
      </header>

      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="w-full max-w-2xl aspect-video rounded-xl bg-black shadow-lg object-cover"
      />
    </section>
  );
}
