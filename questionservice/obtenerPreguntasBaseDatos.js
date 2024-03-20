const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria');
const Pregunta = mongoose.model('Pregunta');
const Tipos = mongoose.model('Tipos');
const Respuesta = mongoose.model('Respuesta');

class ObtenerPreguntas{


    
    async obtenerPregunta(){    
        var resultado = {};

        var pregunta = await Pregunta.aggregate([{ $sample: { size: 1 } }]);

        //por ejemplo capital
        var tipo = await Tipos.findOne({ idPreguntas: { $in: pregunta[0]._id } });

        var respuestas = await Respuesta.aggregate([
            { $match: { tipos: {$in : [tipo._id]}, textoRespuesta: { $ne: [pregunta[0].respuestaCorrecta, "Ninguna de las anteriores" ]} } },
            { $sample: { size: 3 } }
        ]);

        resultado = {
            pregunta: pregunta[0].textoPregunta,
            correcta: pregunta[0].respuestaCorrecta,
            respuestasIncorrecta1:  respuestas[0].textoRespuesta,
            respuestasIncorrecta2:  respuestas[1].textoRespuesta,
            respuestasIncorrecta3:  respuestas[2].textoRespuesta
        };

        return resultado;
    }
}

module.exports = ObtenerPreguntas;