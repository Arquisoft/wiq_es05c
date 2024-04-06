const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria');
const Pregunta = mongoose.model('Pregunta');
const Tipos = mongoose.model('Tipos');
const Respuesta = mongoose.model('Respuesta');

class ObtenerPreguntas{

    async obtenerPregunta(numeroPreguntas, idioma){    
        try{
            console.log("Numero de preguntas: " + numeroPreguntas);
            var resultado = {};
            var objetoExterno= {};
            //Se cojen las preguntas del numero que se pase por parametro
            var preguntas = await Pregunta.aggregate([{ $sample: { size: numeroPreguntas } }]);

            //comprobamos si hay preguntas 
            if(preguntas.length != numeroPreguntas){
                throw new Error("No se han devuelto el numero de preguntas necesario");
            }

            for(var i = 0; i < preguntas.length; i++){   
                try{                   
                    var tipo = await Tipos.findOne({ idPreguntas: { $in: preguntas[i]._id } });

                    var respuestas;
                    
                    if(idioma == "es"){
                        respuestas = await Respuesta.aggregate([
                            { $match: { tipos: {$in : [tipo._id]}, textoRespuesta_es: { $ne: [preguntas[i].respuestaCorrecta_es, "Ninguna de las anteriores" ]} } },
                            { $sample: { size: 3 } }
                        ]);
                    }
                    else{
                        respuestas = await Respuesta.aggregate([
                            { $match: { tipos: {$in : [tipo._id]}, textoRespuesta_en: { $ne: [preguntas[i].respuestaCorrecta_en, "Ninguna de las anteriores" ]} } },
                            { $sample: { size: 3 } }
                        ]);
                    }

                    //comprobamos si hay respuestas
                    if(respuestas.length < 3){
                        throw new Error("No hay suficientes respuestas en la base de datos");
                    }

                    if(idioma == "es"){            
                        resultado = {
                            pregunta: preguntas[i].textoPregunta_es,
                            correcta: preguntas[i].respuestaCorrecta_es,
                            respuestasIncorrecta1:  respuestas[0].textoRespuesta_es,
                            respuestasIncorrecta2:  respuestas[1].textoRespuesta_es,
                            respuestasIncorrecta3:  respuestas[2].textoRespuesta_es
                        };
                    }

                    else{
                        resultado = {
                            pregunta: preguntas[i].textoPregunta_en,
                            correcta: preguntas[i].respuestaCorrecta_en,
                            respuestasIncorrecta1:  respuestas[0].textoRespuesta_en,
                            respuestasIncorrecta2:  respuestas[1].textoRespuesta_en,
                            respuestasIncorrecta3:  respuestas[2].textoRespuesta_en
                        };
                    }

                    objetoExterno["resultado" + (i+1)] = resultado;
            }
            catch(error){
                throw new Error("Error al obtener el tipo o las respuestas de la base de datos");
            }            
        } 

        console.log("Preguntas finales: " + objetoExterno);
            return objetoExterno;
        }
        catch(error){
            throw new Error("Error al obtener las preguntas de la base de datos"); 
        }
    }
}

module.exports = ObtenerPreguntas;