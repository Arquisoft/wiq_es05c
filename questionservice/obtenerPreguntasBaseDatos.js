const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria');
const Pregunta = mongoose.model('Pregunta');
const Tipos = mongoose.model('Tipos');
const Respuesta = mongoose.model('Respuesta');

class ObtenerPreguntas{

    async obtenerPregunta(numeroPreguntas){    
        try{
            var resultado = {};
            var objetoExterno= {};
            //Se cojen las preguntas del numero que se pase por parametro
            var preguntas = await Pregunta.aggregate([{ $sample: { size: numeroPreguntas } }]);

            for(var i = 0; i < preguntas.length; i++){   
                try{                   
                    var tipo = await Tipos.findOne({ idPreguntas: { $in: preguntas[i]._id } });

                    var respuestas = await Respuesta.aggregate([
                        { $match: { tipos: {$in : [tipo._id]}, textoRespuesta: { $ne: [preguntas[i].respuestaCorrecta, "Ninguna de las anteriores" ]} } },
                        { $sample: { size: 3 } }
                    ]);

                    //comprobamos si hay respuestas
                    if(respuestas.length < 3){
                        throw new Error("No hay suficientes respuestas en la base de datos");
                    }
            
                    resultado = {
                        pregunta: preguntas[i].textoPregunta,
                        correcta: preguntas[i].respuestaCorrecta,
                        respuestasIncorrecta1:  respuestas[0].textoRespuesta,
                        respuestasIncorrecta2:  respuestas[1].textoRespuesta,
                        respuestasIncorrecta3:  respuestas[2].textoRespuesta
                    };

                    objetoExterno["resultado" + (i+1)] = resultado;
            }
            catch(error){
                throw new Error("Error al obtener el tipo o las respuestas de la base de datos");
            }            
        } 

        //comprobamos si hay preguntas 
        if(preguntas.lenght != numeroPreguntas){
            throw new Error("No se han devuelto el numero de preguntas necesario");
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