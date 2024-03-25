const express = require('express');
const socketIO = require('socket.io');
const http = require('http'); 
const cors = require('cors');
const RoomQuestions=require('./RoomQuestions');
const port=8005;

// Crear una instancia de Express
const app = express();

// Configurar CORS
app.use(cors());

// Crear una instancia de servidor HTTP
const server = http.createServer(app);

// Crear una instancia de Socket.IO
// Crear una instancia de Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


const roomQuestions = new RoomQuestions(io);
// Configurar Socket.IO para manejar las conexiones de los clientes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Evento personalizado para unir a un usuario a una sala
  socket.on('joinRoom', async ({ id, username }) => {
    try {
      console.log("microservicio--joinroom , valor id "+id+" username "+username);
      await roomQuestions.joinRoom(id, username,socket);
      console.log(`Usuario ${username} se ha unido a la sala ${id}`);
  
    } catch (error) {
      console.log(`Error al unir al usuario a la sala: ${error.message}`);
    }
  });
  // Evento personalizado para crear una sala
  socket.on('createRoom', async ({ username }) => {
    try {
     const id= await roomQuestions.createRoom(username,socket);
      console.log(`Usuario ${username} ha creado la sala ${id}`);
    
  
    } catch (error) {
      console.log(`Error al crear la sala: ${error.message}`);
    }
  });
  //mostrar los usuarios una vez la pagina esta cargada 
  
  socket.on('ready',({id}) => {

    roomQuestions.emitCurrentUsers(id,socket);
  });


  socket.on('startGame', async ({id}) => {
    console.log("solicitud empezar juego sala:"+id);
    roomQuestions.startGame(id,socket);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

});

// Iniciar el servidor
server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));