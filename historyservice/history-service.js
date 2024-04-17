const express = require('express');
const mongoose = require('mongoose');

const Model = require('./history-model')

const prueba = require('./history-datainitial')


const Historial = require("./obtenerDetallesUsuarioBaseDatos");
const historial = new Historial();

const UpdateHistorial = require("./guardarDatosUsuarioHistorial");
const updateHistory = new UpdateHistorial();

const app = express();
const port = 8004; 

// Middleware to parse JSON in request body
app.use(express.json());
// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/historydb';
mongoose.connect(mongoUri);

app.get('/getHistoryDetallado', async(req,res)=> {
  try{  
    console.log("entra en gethistory detallado");
    //obtenemos el usuario en sesion
    const usuario = req.query.usuario;

    console.log("Usuario: "+usuario);

    //comprobamos si se ha pasado un usuario
    if(usuario === undefined){
      throw new Error('No hay un usuario en la petición');
    }

    //coger datos bd
    console.log("entra en gethistory detallado");
    const history = await historial.obtenerDetalleUser(usuario);
    //para devolver la informacion detallada del usuario
    res.json(history);
    
  } catch(error) {
    res.status(400).json({  error: error.message  });
  }
    
}); 

app.get('/getHistoryTotal', async(req,res)=> {
  try{  
    console.log("entra en gethistory total");

    //obtenemos el usuario en sesion
    const usuario = req.query.usuario;

    console.log("Usuario: "+usuario);

    //comprobamos si se ha pasado un usuario
    if(usuario === undefined){
      throw new Error('No hay un usuario en la petición');
    }

    //coger detalles totales de la bd
    const historyTotal = await historial.obtenerDatosTotales(usuario);
    //para devolver los detalles totales del historial
    res.json(historyTotal);
    
  } catch(error) {
    res.status(400).json({  error: error.message  });
  }
    
}); 

app.post('/updateHistory', async (req, res) => {
  try {
    console.log("Entra en guardar usuario");
    await updateHistory.guardarPartida(req.body);    
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }});

app.get('/getRankingDiarias', async (req, res) => {
  console.log("Entra en sacar ranking diarias arr");
  try {
    console.log("Entra en sacar ranking diarias");
    const ranking = await historial.obtenerPreguntasDiariasAcertadas();    
    res.json(ranking);
  } catch (error) {
      res.status(400).json({ error: error.message }); 
  }});

// Start the server
const server = app.listen(port, () => {
  console.log(`Generate Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server