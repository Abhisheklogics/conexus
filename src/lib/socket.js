import { io } from 'socket.io-client';

export const makeSocket = ({ role, roomId, name }) =>
  io('http://localhost:4000', {
    transports: ['websocket'],
    auth: { role, roomId, name },   
  });
