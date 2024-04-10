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

const Scheduler = require('./scheduler');
const scheduler = new Scheduler();
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

// Endpoints para la obtención de preguntas para los modos de juego

app.get('/getQuestion', async(req,res)=> {
  try{      
    const idioma = req.query.idioma;
    //coger pregunta bd
    const questions = await question.obtenerPregunta(1, idioma);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(500).json({ error: error.message }); 
  }
}); 

app.get('/getQuestionDiaria', async(req,res)=> {
  try{      
    const idioma = req.query.idioma;
    const fecha = req.query.fecha;
    //coger pregunta bd
    const questions = await question.obtenerPreguntaDiaria(idioma, fecha);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
    
}); 

app.get('/getQuestionModoBasico', async(req,res)=> {
  console.log('entra en el getQuestionModoBasico del question Service');
  try{      
    const idioma = req.query.idioma;

    console.log("idioma",idioma);
    //coger pregunta bd
    const questions = await question.obtenerPregunta(10, idioma);
    //para devolver la pregunta
    console.log('preguntasModoBasico en el microservicio',questions);
    res.json(questions);
    
  } catch(error) {
    res.status(500).json({ error: error.message }); 
  }
    
}); 

app.get('/getQuestionModoMismaCategoria', async(req,res)=> {
  try{      
    const idioma = req.query.idioma;
    const categoria = req.query.categoria;
    console.log("idiomaasdasdasd: "+idioma+" categoria: "+categoria);
    //coger pregunta bd
    const questions = await question.obtenerPreguntaMismaCategoria(10, idioma, categoria);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(500).json({ error: error.message }); 
  }
}); 

app.get('/getQuestionModoCustom', async(req,res)=> {
  try{      
    const idioma = req.query.idioma;
    const numPreguntas = parseInt(req.query.numPreguntas);

    if(numPreguntas > 50)numPreguntas=50;//Limito por arriba a 50
    if(numPreguntas < 1)numPreguntas=1;//Limito por abajo a 1

    //coger pregunta bd
    const questions = await question.obtenerPregunta(numPreguntas, idioma);
    //para devolver la pregunta
    res.json(questions);
    
  } catch(error) {
    res.status(500).json({ error: error.message }); 
  }
}); 

// Endpoints para la generación de preguntas

app.get('/generateQuestion', async(req,res)=> {
    try{  
      await newquestion.ejecutarOperaciones();           
      res.status(200).send("Pregunta generada y guardada correctamente.");
    } catch(error) {
      res.status(500).json({ error: error.message }); 
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
