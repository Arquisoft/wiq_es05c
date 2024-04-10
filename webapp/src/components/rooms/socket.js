// socket.js
import socketIOClient from 'socket.io-client';
//nueva variable de entorno para el socket apunta directamente al microservicio 
const socket = socketIOClient(process.env.REACT_APP_SOCKET_URI || 'http://localhost:8005');

export default socket;