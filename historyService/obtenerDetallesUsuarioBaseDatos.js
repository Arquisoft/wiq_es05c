const mongoose = require('mongoose');

const Historial = mongoose.model('historial');

class History{
    
    async obtenerDetalleUser(usuario){  
        console.log("entra en obtenerDetalleUser");  
        var resultado = {}; //el json con la informacion de un juego
        var resultadoFinal= {}; //el json con la informacion de todos los juegos
       
        console.log(usuario);
        //Se cojen los detalles del usuario que se pase por parametro
        var usuarioDetalles = await Historial.findOne({ user: { $in: usuario} });

        //recorre todos los juegos que tiene el usuario y los guarda en un json
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
            //añade al resultado final el json con la informacion de un juego
            resultadoFinal["resultado" + (i+1)] = resultado;
        }
        console.log(resultadoFinal);
        return resultadoFinal;
    }

    async obtenerDatosTotales(usuario){    
        var resultado = {}; //el json con la informacion de un juego
        console.log(usuario);
        
        //Se cojen los detalles del usuario que se pase por parametro
        var usuarioDetalles = await Historial.findOne({ user: { $in: usuario } });

        //variables para guardar los datos totales
        var numeroJuegos = usuarioDetalles.juegos.length;
        var preguntasAcertadas = 0;
        var preguntasFalladas = 0;
        var tiempoTotal = 0;

        //recorre todos los juegos que tiene el usuario y suma los datos
        for(var i = 0; i < usuarioDetalles.juegos.length; i++){
            console.log(usuarioDetalles.juegos[i]);
            preguntasAcertadas += usuarioDetalles.juegos[i].preguntasAcertadas;
            preguntasFalladas += usuarioDetalles.juegos[i].preguntasFalladas;
            tiempoTotal += usuarioDetalles.juegos[i].tiempo; 
        }

        //resultado con la suma de los datos totales del usuario
        resultado = {
            numeroJuegos: numeroJuegos,
            preguntas_falladas: preguntasFalladas,
            preguntas_acertadas: preguntasAcertadas,
            tiempoTotal : tiempoTotal
        }; 
        console.log(resultado);
        return resultado;
    }
}

module.exports = History;