const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria');
const Pregunta = mongoose.model('Pregunta');
const Tipos = mongoose.model('Tipos');
const Respuesta = mongoose.model('Respuesta');

class ObtenerPreguntas{



    async obtenerPregunta(numeroPreguntas){    
        var resultado = {};
        var objetoExterno= {};
        //Se cojen las preguntas del numero que se pase por parametro
        console.log("Numero" + numeroPreguntas);
        var preguntas = await Pregunta.aggregate([{ $sample: { size: numeroPreguntas } }]);
        console.log("Preguntas " + preguntas);
        for(var i = 0; i < preguntas.length; i++){
     
        var tipo = await Tipos.findOne({ idPreguntas: { $in: preguntas[i]._id } });
        console.log("Pregunta" + preguntas[i]);
        var respuestas = await Respuesta.aggregate([
            { $match: { tipos: {$in : [tipo._id]}, textoRespuesta: { $ne: [preguntas[i].respuestaCorrecta, "Ninguna de las anteriores" ]} } },
            { $sample: { size: 3 } }
        ]);
       
        resultado = {
            pregunta: preguntas[i].textoPregunta,
            correcta: preguntas[i].respuestaCorrecta,
            respuestasIncorrecta1:  respuestas[0].textoRespuesta,
            respuestasIncorrecta2:  respuestas[1].textoRespuesta,
            respuestasIncorrecta3:  respuestas[2].textoRespuesta
        };
        console.log("Resultado" + resultado);
        objetoExterno["resultado" + (i+1)] = resultado;
        
    }
    console.log( "objeto entero " + objetoExterno);
        return objetoExterno;
    }
}

module.exports = ObtenerPreguntas;