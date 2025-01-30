import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { io } from 'socket.io-client';
import { useParams, useLocation } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneAltSlash, FaVideo, FaVideoSlash, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const [streams, setStreams] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const peerRef = useRef(null);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenShareStreamRef = useRef(null);
  const { email: userEmail } = location.state || {};
  const firstUserRef = useRef(null); // Track the first user

  useEffect(() => {
    socketRef.current = io('https://conbeckend.onrender.com/');
    const peer = new Peer();
    peerRef.current = peer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localStreamRef.current = stream;
      setLocalStream(stream);

      peer.on('open', (id) => {
        socketRef.current.emit('join-room', { roomId, peerId: id, email: userEmail });
        setStreams((prev) => ({ ...prev, [id]: { stream } }));

        // Mark the first user
        if (!firstUserRef.current) {
          firstUserRef.current = id; // Store the first user's peerId
        }
      });

      peer.on('call', (call) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          setStreams((prev) => ({ ...prev, [call.peer]: { stream: remoteStream } }));
        });
      });
    });

    socketRef.current.on('user-connected', ({ peerId }) => {
      const call = peer.call(peerId, localStreamRef.current);
      call.on('stream', (remoteStream) => {
        setStreams((prev) => ({ ...prev, [peerId]: { stream: remoteStream } }));
      });
    });

    socketRef.current.on('user-disconnected', ({ peerId }) => {
      setStreams((prev) => {
        const updatedStreams = { ...prev };
        delete updatedStreams[peerId];
        return updatedStreams;
      });
    });

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
        socketRef.current.disconnect();
      }
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [roomId]);

  const toggleMute = () => {
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setIsMuted(!audioTrack.enabled);
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setIsVideoOff(!videoTrack.enabled);
  };

 const toggleScreenShare = async () => {
    if (isScreenSharing) {
        if (screenShareStreamRef.current) {
            screenShareStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        // Switch back to webcam stream
        Object.values(peerRef.current.connections).forEach((connection) => {
            const call = peerRef.current.call(connection[0].peer, localStreamRef.current);
            call.on('stream', (remoteStream) => {
                setStreams((prev) => ({ ...prev, [connection[0].peer]: { stream: remoteStream } }));
            });
        });

        setIsScreenSharing(false);
    } else {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

            screenShareStreamRef.current = screenStream;

            // Send screen stream to all peers
            Object.values(peerRef.current.connections).forEach((connection) => {
                const call = peerRef.current.call(connection[0].peer, screenStream);
                call.on('stream', (remoteStream) => {
                    setStreams((prev) => ({ ...prev, [connection[0].peer]: { stream: remoteStream } }));
                });
            });

            setIsScreenSharing(true);
        } catch (err) {
            console.error('Error sharing screen:', err);
        }
    }
};

  const leaveRoom = () => {
    socketRef.current.emit('leave-room', { roomId, peerId: peerRef.current.id });
    localStreamRef.current.getTracks().forEach((track) => track.stop());
    peerRef.current.destroy();
    socketRef.current.disconnect();
    window.location.href = '/';
  };

  return (
    <div className="room-container min-h-screen bg-gray-900 text-white flex flex-col">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Room Code: {roomId}</h1>
        <div className="flex space-x-4">
          <button onClick={toggleMute} className={`p-2 rounded-lg ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}>
            {isMuted ? <FaMicrophoneAltSlash className="text-white" /> : <FaMicrophone className="text-white" />}
          </button>
          <button onClick={toggleVideo} className={`p-2 rounded-lg ${isVideoOff ? 'bg-red-500' : 'bg-green-500'}`}>
            {isVideoOff ? <FaVideoSlash className="text-white" /> : <FaVideo className="text-white" />}
          </button>
          <button onClick={toggleScreenShare} className={`p-2 rounded-lg ${isScreenSharing ? 'bg-red-500' : 'bg-blue-500'}`}>
            <FaDesktop className="text-white" />
          </button>
          <button onClick={leaveRoom} className="p-2 bg-red-500 rounded-lg">
            <FaPhoneSlash className="text-white" />
          </button>
        </div>
      </nav>
      <div className="flex-grow p-8">
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(streams).map(([id, { stream }]) => (
            <div key={id} className="relative w-[500px] h-[400px] ml-10 border border-gray-700 rounded-lg overflow-hidden">
              {id == firstUserRef.current ? ( // Check if it's the first user
                <video
                  playsInline
                  autoPlay
                 
                  muted={id === peerRef.current.id} 
                  ref={(video) => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                 
                />
              ) : (
               <video
                  playsInline
                  autoPlay
                  className="w-fit h-fit"
                  muted={id === peerRef.current.id} 
                  ref={(video) => {
                    if (video && stream) {
                      video.srcObject = stream;
                    }
                  }}
                 
                />
              )}
              <p className="absolute bottom-1 left-1 bg-black bg-opacity-75 text-xs px-2 py-1 rounded">
                {id === peerRef.current.id ? 'You' : id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
