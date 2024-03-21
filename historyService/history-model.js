const mongoose = require('mongoose');

//historial
const historySchema = new mongoose.Schema({
  
  user: {
    type: String,
    required: true
  },
  
  juegos: [{
    numeroDeJuego: {
      type: Number,
      required: true
    },
    numeroDePreguntasFalladas: {
      type: Number,
      required: true
    },
    numeroDePreguntasAcertadas: {
      type: Number,
      required: true
    },
    tiempo: {
      type: Number,
      required: true
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  }]

  });

const History = mongoose.model('historial', historySchema);
