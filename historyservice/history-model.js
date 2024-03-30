const mongoose = require('mongoose');

//historial
const historySchema = new mongoose.Schema({
  
  user: {
    type: String,
    required: true
  },
  
  juegos: [{
    numeroJuego: {
      type: Number,
      required: true
    },
    preguntasFalladas: {
      type: Number,
      required: true
    },
    preguntasAcertadas: {
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

