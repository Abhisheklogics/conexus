import React, { useEffect, useRef } from "react";
import { makeSocket } from "../lib/socket";

export default function StudentRoom({ roomId, name }) {
  const remoteVideoRef = useRef();
  const pcRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    const socket = makeSocket({ role: "student", roomId, name });
    socketRef.current = socket;

    socket.emit("join-room", { roomId, role: "student", name });

   
    socket.on("offer", async ({ from, sdp }) => {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;

      pc.ontrack = (ev) => {
        if (!remoteVideoRef.current.srcObject)
          remoteVideoRef.current.srcObject = new MediaStream();
        remoteVideoRef.current.srcObject.addTrack(ev.track);
      };

      pc.onicecandidate = ({ candidate }) =>
        candidate && socket.emit("ice", { to: from, candidate });

      await pc.setRemoteDescription(sdp);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { to: from, sdp: pc.localDescription });
    });

   
    socket.on("ice", ({ candidate }) => {
      if (candidate) pcRef.current?.addIceCandidate(candidate);
    });

    socket.on("room-closed", () => {
      alert("Teacher disconnected, room closed");
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
      pcRef.current?.close();
    };
  }, [roomId, name]);

  return (
    <section className="flex flex-col items-center gap-4 p-4 text-white">
      <header className="flex items-center gap-3">
        <span className="text-lg font-medium">Student:</span>
        <span className="px-3 py-1 rounded-full bg-sky-600">
          {name || "Guest"}
        </span>
      </header>

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="w-full max-w-2xl aspect-video rounded-xl bg-black shadow-lg object-cover"
      />

      <div className="text-sm text-gray-300">
        Waiting for teacher... (ensure camera permissions on teacher side)
      </div>
    </section>
  );
}
