const mongoose = require('mongoose');

const Historial = mongoose.model('historial');

class GuardarDatosUsuarioHistorial{
    
    async guardarPartida(datos){  
        console.log("Datos de la partida ",datos);
       //comprueba si hay datos almacenados para ese usuario
       await Historial.findOne({ user: datos.user });

       Historial.findOne({ user: datos.user  })
         .then(usuarioExistente => {
           if (!usuarioExistente) {          
            // Si no existe historial para ese usuario lo crea
            var nuevoHistorial = new Historial({
                user: datos.user,
                diariasAcertadas:0,
                juegos: [
                  {
                    numeroJuego: 1,
                    preguntasFalladas: datos.incorrectas,
                    preguntasAcertadas: datos.correctas,
                    tiempo: datos.tiempoTotal,
                    fecha: new Date() // Usar la fecha actual
                  }
                ]
            });           
   
            //Guardamos el nuevo historial
            nuevoHistorial.save();
            console.log("Guardado nuevo historial");
           }

           else{
            //añade un nuevo juego
            usuarioExistente.juegos.push({
              numeroJuego: usuarioExistente.juegos.length+1,
              preguntasFalladas: datos.incorrectas,
              preguntasAcertadas: datos.correctas,
              tiempo: datos.tiempoTotal,
              fecha: new Date() // Usar la fecha actual
            });
            
            usuarioExistente.save();
            console.log("Guardado historial");
           }

         });
    }

    async guardarPartidaDiaria(datos){  
      console.log("Datos de la partida diaria",datos);
     //comprueba si hay datos almacenados para ese usuario
     await Historial.findOne({ user: datos.user });

     Historial.findOne({ user: datos.user  })
       .then(usuarioExistente => {
         if (!usuarioExistente) {          
          // Si no existe historial para ese usuario lo crea
          var nuevoHistorial = new Historial({
              user: datos.user,
              diariasAcertadas:0
          });           
          //Guardamos el nuevo historial
          nuevoHistorial.save();
          console.log("Guardado nuevo historial");
         }
  });
  Historial.updateOne({ user: datos.user }, { $inc: { "diariasAcertadas": 1 } }).then(resultado => {
    console.log('Se ha actualizado el ranking diario correctamente o.');
  }).catch(error => {
    console.error('Error al actualizar el ranking diario:', error);
  });
}
}

module.exports = GuardarDatosUsuarioHistorial;