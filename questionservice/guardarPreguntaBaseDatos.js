const mongoose = require('mongoose');
const Categoria = mongoose.model('Categoria');
const Pregunta = mongoose.model('Pregunta');
const Tipos = mongoose.model('Tipos');
const Respuesta = mongoose.model('Respuesta');

class GuardarBaseDatos{

    constructor(){
        this.finalQuestion;
    }

    guardarEnBaseDatos(finalQuestion){    
      this.finalQuestion = finalQuestion;  
      //primero deberiamos de guardar la categoria     
      this.guardarCategoria().then(idCategoria => {
        // Guardamos el tipo de pregunta
        return this.guardarPreguntaTipo(idCategoria);
        }).then(idTipo => {
            // Guardamos las respuestas incorrectas
            this.guardarPrimeraIncorrecta(idTipo);
            this.guardarSegundaIncorrecta(idTipo);
            this.guardarTerceraIncorrecta(idTipo);
        }).catch(error => {
          throw new Error("Error al guardar la pregunta: " + error.message);
        });
    }

    guardarCategoria(){
      return new Promise((resolve, reject) => {
        var idCategoria;
    
        Categoria.findOne({ nombre: this.finalQuestion.category })
          .then(categoriaExistente => {
            if (!categoriaExistente) {    
              // Si no existe ya esa categoria la crea
              var nuevaCategoria = new Categoria({
                nombre: this.finalQuestion.category,
              });
          
              //Guardamos la nueva pregunta
              nuevaCategoria.save().then(categoriaGuardada => {
                //guardamos el id de la categoria nueva
                  idCategoria = categoriaGuardada._id;
                  resolve(idCategoria); 
              })
              .catch(error => {
                  reject(new Error('Error al guardar la nueva categoría en la base de datos: ' + error.message));
              });
            }
    
            else{
              //guardamos el id de la categoria existente
              idCategoria = categoriaExistente._id;
              resolve(idCategoria);
            }
          });
      }) .catch(error => {
        reject(new Error('No se ha guardado la categoria en la base de datos ' + error.message));
      });
    }

    guardarPreguntaTipo(idCategoria){
      return new Promise((resolve, reject) => {
        var idTipo;
        // Comprobar si la pregunta ya existe
        Pregunta.findOne({ textoPregunta: this.finalQuestion.question })
        .then(preguntaExistente => {
          if (!preguntaExistente) {          
            // Si no existe la pregunta, se crea
            var nuevaPregunta = new Pregunta({
              textoPregunta: this.finalQuestion.question,
              respuestaCorrecta: this.finalQuestion.correct,
              categoria: idCategoria
            });
    
            // Guardar la nueva pregunta
            nuevaPregunta.save()
              .then(preguntaGuardada => {
    
                // Comprobar si existe el tipo de la pregunta y asociarlo
                Tipos.findOne({ nombreTipo: this.finalQuestion.type })
                  .then(tipoExistente => {
                    if (!tipoExistente) {          
                      // Si no existe el tipo, se crea
                      var nuevoTipo = new Tipos({
                        idPreguntas: [preguntaGuardada._id],
                        nombreTipo: this.finalQuestion.type
                      });
                        
                    // Guardar el nuevo tipo
                    nuevoTipo.save().then(tipoGuardado => {
                      //guardamos el id del tipo
                      idTipo = tipoGuardado._id;
                      resolve(idTipo);
                    })
                    .catch(error => {
                        reject(new Error('Error al guardar el nuevo tipo en la base de datos: ' + error.message));
                    });
                  } 
                  else {
                    // Si el tipo existe, agregar el ID de la nueva pregunta a idPreguntas
                    tipoExistente.idPreguntas.push(preguntaGuardada._id);
                    // Guardar el tipo actualizado
                    tipoExistente.save().then(tipoGuardado => {
                      //guardamos el id del tipo
                      idTipo = tipoGuardado._id;
                      resolve(idTipo);
                    })
                    .catch(error => {
                        reject(new Error('Error al guardar el tipo actualizado en la base de datos: ' + error.message));
                    });
                  }            
                })
                .catch(error => {
                  reject(new Error('Error al buscar el tipo de pregunta en la base de datos: ' + error.message));
              }) 
              .catch(error => {
                reject(new Error('Error al guardar la nueva pregunta en la base de datos: ' + error.message));
            });
            });
        }
        }).catch(error => {
          reject(new Error('Error al guardar la pregunta en la base de datos: ' + error.message));
        });
      });
    }

    guardarPrimeraIncorrecta(idTipo){
         //comprobar si la primera respuesta existe ya en la base de datos
         Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect1 })
         .then(respuestaExistente => {
           if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.incorrect1,
               tipos: [idTipo]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(idTipo)) {
               //agregamos el nuevo tipo
               respuestaExistente.tipos.push(idTipo);
   
               respuestaExistente.save();
             }
           }
         }).catch(error => {
           throw new Error('Error al guardar la primera respuesta incorrecta en la base de datos: ' + error.message);
         });
    }

    guardarSegundaIncorrecta(idTipo){    
        //comprobar si la segunda respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect2 })
        .then(respuestaExistente => {
          if (!respuestaExistente) {          
            // Si no existe ya esa pregunta la crea
            var nuevaRespuesta = new Respuesta({
              textoRespuesta: this.finalQuestion.incorrect2,
              tipos: [idTipo]
            });    
  
            //Guardamos la nueva respuesta
            nuevaRespuesta.save();
          }
          else{
            //comprobamos si ya existe el tipo en esa respuesta
            if (!respuestaExistente.tipos.includes(idTipo)) {
              //agregamos el nuevo tipo
              respuestaExistente.tipos.push(idTipo);
  
              respuestaExistente.save();
            }
          }
        }).catch(error => {
          throw new Error('Error al guardar la segunda respuesta incorrecta en la base de datos: ' + error.message);
        });        
    }

    guardarTerceraIncorrecta(idTipo){
        //comprobar si la tercera respuesta existe ya en la base de datos
        Respuesta.findOne({ textoRespuesta: this.finalQuestion.incorrect3 })
        .then(respuestaExistente => {
            if (!respuestaExistente) {          
             // Si no existe ya esa pregunta la crea
             var nuevaRespuesta = new Respuesta({
               textoRespuesta: this.finalQuestion.incorrect3,
               tipos: [idTipo]
             });    
   
             //Guardamos la nueva respuesta
             nuevaRespuesta.save();
           }
           else{
             //comprobamos si ya existe el tipo en esa respuesta
             if (!respuestaExistente.tipos.includes(idTipo)) {
               //agregamos el nuevo tipo
               respuestaExistente.tipos.push(idTipo);
   
               respuestaExistente.save();
             }
           }
        }).catch(error => { 
          throw new Error('Error al guardar la tercera respuesta incorrecta en la base de datos: ' + error.message);
        });
    }
}

module.exports = GuardarBaseDatos;