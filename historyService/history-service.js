const express = require('express');
const mongoose = require('mongoose');

const Model = require('./history-model')

const prueba = require('./history-datainitial')


const Historial = require("./obtenerDetallesUsuarioBaseDatos");
const historial = new Historial();

const app = express();
const port = 8004; 

// Middleware to parse JSON in request body
app.use(express.json());
// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/historydb';
mongoose.connect(mongoUri);

app.get('/getHistoryDetallado', async(req,res)=> {
  try{  
    //coger datos bd
    console.log("entra en gethistory detallado");
    const history = await historial.obtenerDetalleUser("usuario1");
    //para devolver la informacion detallada del usuario
    res.json(history);
    
  } catch(error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
    
}); 

app.get('/getHistoryTotal', async(req,res)=> {
  try{  
    //coger detalles totales de la bd
    const historyTotal = await historial.obtenerDatosTotales("usuario1");
    //para devolver los detalles totales del historial
    res.json(historyTotal);
    
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
