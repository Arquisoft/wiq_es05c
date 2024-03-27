// socket.js
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(process.env.REACT_APP_API_URI || 'http://localhost:8005');

export default socket;