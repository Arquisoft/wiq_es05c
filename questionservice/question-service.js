const express = require('express');
const mongoose = require('mongoose');
const Model = require('./question-model');
const socketIO = require('socket.io');
const http = require('http'); 
const cors = require('cors');

const Question = require("./obtenerPreguntasBaseDatos");
const question = new Question();

const NewQuestion = require("./questionGeneration");
const newquestion = new NewQuestion();
const RoomQuestions = require('./RoomQuestions');
const app = express();
app.use(cors());
const servidor = http.createServer(app);
const io = socketIO(servidor);
const roomQuestions = new RoomQuestions(question,io);

const port = 8003; 

// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questionsdb';
mongoose.connect(mongoUri);

app.get('/getQuestion', async(req,res)=> {
  try{  
    //coger pregunta bd
    const questions = await question.obtenerPregunta(1);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
    
}); 
app.get('/getQuestionModoBasico', async(req,res)=> {
  try{  
    //coger pregunta bd
    const questions = await question.obtenerPregunta(10);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
    
}); 

app.get('/generateQuestions', async(req,res)=> {
    try{  
      const instancia =  newquestion.ejecutarOperaciones();
     
    } catch(error) {
      res.status(error.response.status).json({ error: error.response.data.error });
    }
      
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
// Start the server
const server = app.listen(port, () => {
  console.log(`Generate Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });





// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  socket.on('joinRoom', (roomId, username) => {
    // Realizar las actualizaciones necesarias en la lista de salas, por ejemplo:
    // - Agregar al usuario a la sala
    // - Actualizar la lista de salas en la base de datos
    // - Emitir un evento para notificar a todos los clientes sobre el cambio en la lista de salas
    // - etc.
  });
  // Aquí puedes agregar el resto de tu lógica de Socket.io, como manejar eventos y emitir mensajes
});


module.exports = server
