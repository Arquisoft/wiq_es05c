// socket.js
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:8005');

export default socket;