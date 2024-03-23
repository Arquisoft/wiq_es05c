const express = require('express');
const socketIO = require('socket.io');
const http = require('http'); 
const cors = require('cors');

const port=8005;

// Crear una instancia de Express
const app = express();

// Configurar CORS
app.use(cors());

// Crear una instancia de servidor HTTP
const server = http.createServer(app);

// Crear una instancia de Socket.IO
const io = socketIO(server);

// Configurar Socket.IO para manejar las conexiones de los clientes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Aquí puedes manejar los eventos de Socket.IO

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));