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
      return new Promise((resolve, reject) => { 
        this.finalQuestion = finalQuestion;  

        //primero deberiamos de guardar la categoria     
        this.guardarCategoria().then(idCategoria => {
          // Guardamos el tipo de pregunta
          return this.guardarPreguntaTipo(idCategoria);
          }).then(idTipo => {
            Promise.all([
              //unido en un metodo para evitar mas codigo 
              this.guardarRespuestaIncorrecta(idTipo, this.finalQuestion.incorrect1_es, this.finalQuestion.incorrect1_en),
              this.guardarRespuestaIncorrecta(idTipo, this.finalQuestion.incorrect2_es, this.finalQuestion.incorrect2_en),
              this.guardarRespuestaIncorrecta(idTipo, this.finalQuestion.incorrect3_es, this.finalQuestion.incorrect3_en)
            
            ]).then(() => {
              console.log("Pregunta guardada correctamente en la base de datos.");
              resolve(); //para que se resuelva cuando las tres respuestas incorrectas se hayan guardado
            }).catch(error => {
              throw new Error("Error al guardar las respuestas incorrectas: " + error.message);
            });
          }).catch(error => {
            throw new Error("Error al guardar la pregunta: " + error.message);
          });
      }).catch(error => {
        reject(new Error('Error al guardar la pregunta en la base de datos: ' + error.message));
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
          }).catch(error => {
             reject(new Error('No se ha guardado la categoria en la base de datos ' + error.message));
      });
    
    });
  }
  

    guardarPreguntaTipo(idCategoria){
      return new Promise((resolve, reject) => {
        var idTipo;
        // Comprobar si la pregunta ya existe
        Pregunta.findOne({ textoPregunta_es: this.finalQuestion.question_es })
        .then(preguntaExistente => {
          if (!preguntaExistente) {          
            // Si no existe la pregunta, se crea
            var nuevaPregunta = new Pregunta({
              //en español
              textoPregunta_es: this.finalQuestion.question_es,
              respuestaCorrecta_es: this.finalQuestion.correct_es,
              //en ingles
              textoPregunta_en: this.finalQuestion.question_en,
              respuestaCorrecta_en: this.finalQuestion.correct_en,
              //categoria
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
          reject(new Error('Error al guardar la pregunta en la base de datos, la pregunta ya existe: ' + error.message));
        });
      });
    }

    guardarRespuestaIncorrecta(idTipo, incorrect_es, incorrect_en) {
      return Respuesta.findOne({textoRespuesta_es: incorrect_es})
        .then(respuesta => {
          if (!respuesta) {
            if (!incorrect_es || !incorrect_en || !idTipo || incorrect_es.length === 0 || incorrect_en.length === 0 || idTipo.length === 0) {
              throw new Error('No existe la pregunta en la base de datos');
            }else{
                //solo se crea si existe la respuesta incorrecta
              const nuevaRespuesta = new Respuesta({
                textoRespuesta_es: incorrect_es,
                textoRespuesta_en: incorrect_en,
                idTipoPregunta: idTipo,
                correcta: false
              });
              console.log('vales incorrect y demas', incorrect_es, incorrect_en, idTipo);
              console.log('llamas al save', nuevaRespuesta);
              return nuevaRespuesta.save();
            }
          }
    
          return respuesta;
        }).catch(error => {
          throw new Error('Error al guardar la respuesta incorrecta en la base de datos: ' + error.message);
        });
    }
}

module.exports = GuardarBaseDatos;