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
      await roomQuestions.joinRoom(id, username);
      console.log(`Usuario ${username} se ha unido a la sala ${id}`);
    } catch (error) {
      console.log(`Error al unir al usuario a la sala: ${error.message}`);
    }
  });
  // Evento personalizado para crear una sala
  socket.on('createRoom', async ({ username }) => {
    try {
      await roomQuestions.createRoom(username);
      console.log(`Usuario ${username} ha creado la sala ${id}`);
    } catch (error) {
      console.log(`Error al crear la sala: ${error.message}`);
    }
  });
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
app.get('/joinroom/:id/:username',async(req,res)=> {
    try {
      const { id,username } = req.params;
      // Aquí puedes buscar en tu base de datos las preguntas para la sala con el ID proporcionado
      // y devolverlas en la respuesta. Este es solo un ejemplo y puede que necesites ajustarlo
      // a tus necesidades.
      const questions = await roomQuestions.joinRoom(id,username);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las preguntas para la sala' });
    }
  
  });
  app.get('/createroom/:username',async(req,res)=> {
    console.log("entra");
    try{
      const { username } = req.params;
      const room = await roomQuestions.createRoom(username);
      console.log("sale con valor ",room);
      res.json(room);
    }catch(error){
      res.status(500).json({ error: 'Error al crear la sala' });
    }});
  
    app.get('/startgame/:id/:username',async(req,res)=> {
      try {
        const { id,username } = req.params;
        // Aquí puedes buscar en tu base de datos las preguntas para la sala con el ID proporcionado
        // y devolverlas en la respuesta. Este es solo un ejemplo y puede que necesites ajustarlo
        // a tus necesidades.
        const questions = await roomQuestions.startGame(id,username);
        res.json(questions);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas para la sala' });
      }
    
    });
// Iniciar el servidor
server.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));