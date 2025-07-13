import { io } from 'socket.io-client';

export const makeSocket = ({ role, roomId, name }) =>
  io('https://meetbeckend.onrender.com', {
    transports: ['websocket'],
    auth: { role, roomId, name },   
  });
