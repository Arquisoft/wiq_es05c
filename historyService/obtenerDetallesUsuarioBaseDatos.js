const mongoose = require('mongoose');

const Historial = mongoose.model('historial');

class History{



    async obtenerDetalleUser(usuario){    
        var resultado = {};
        var objetoExterno= {};
        //Se cojen los detalles del usuario que se pase por parametro
        console.log(usuario);
        var usuarioDetalles = await Historial.findOne({ idUsuario: { $in: usuario._id } });
        //var detallesHistorial = await Historial.aggregate([{ $sample: { size: 1 } }]);
        console.log(preguntas);
        for(var i = 0; i < usuarioDetalles.juegos.length; i++){
        console.log(usuarioDetalles.juegos[i]);
       
        resultado = {
            numeroJuego: usuarioDetalles.juegos[i].numeroJuego,
            preguntas_falladas:usuarioDetalles.juegos[i].preguntasFalladas,
            preguntas_acertadas:usuarioDetalles.juegos[i].preguntasAcertadas,
            tiempo : usuarioDetalles.juegos[i].tiempo,
            fecha: usuarioDetalles.juegos[i].fecha
        };
        console.log(resultado);
        objetoExterno["resultado" + (i+1)] = resultado;
        
    }
    console.log(objetoExterno);
        return objetoExterno;
    }

    async obtenerDatosTotales(usuario){    
        var resultado = {};
        var objetoExterno= {};
        //Se cojen los detalles del usuario que se pase por parametro
        console.log(usuario);
        var usuarioDetalles = await Historial.findOne({ idUsuario: { $in: usuario._id } });
        //var detallesHistorial = await Historial.aggregate([{ $sample: { size: 1 } }]);
        console.log(preguntas);
        var numeroJuegos = usuarioDetalles.juegos.length;
        var preguntasAcertadas = 0;
        var preguntasFalladas = 0;
        var tiempoTotal = 0;
        for(var i = 0; i < usuarioDetalles.juegos.length; i++){
            console.log(usuarioDetalles.juegos[i]);
            preguntasAcertadas += usuarioDetalles.juegos[i].preguntasAcertadas;
            preguntasFalladas += usuarioDetalles.juegos[i].preguntasFalladas;
            tiempoTotal += usuarioDetalles.juegos[i].tiempo; 
        }
    resultado = {
        numeroJuegos: numeroJuegos,
        preguntas_falladas: preguntasFalladas,
        preguntas_acertadas: preguntasAcertadas,
        tiempoTotal : tiempoTotal
    }; 
    console.log(resultado);
    objetoExterno["resultado"] = resultado;

    console.log(objetoExterno);
        return objetoExterno;
    }
}

module.exports = ObtenerPreguntas;