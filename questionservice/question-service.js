const express = require('express');
const mongoose = require('mongoose');

const Model = require('./question-model')

const Question = require("./obtenerPreguntasBaseDatos");
const question = new Question();

const NewQuestion = require("./questionGeneration");
const newquestion = new NewQuestion();

const app = express();
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

app.get('/generateQuestion', async(req,res)=> {
    try{  
      const instancia =  newquestion.ejecutarOperaciones();
     
    } catch(error) {
      res.status(error.response.status).json({ error: error.response.data.error });
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

module.exports = server
