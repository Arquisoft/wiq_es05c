const PreguntaWiki = require("./obtenerPreguntasWikidata");
const preguntaWiki = new PreguntaWiki();

const GuardarPregunta = require("./guardarPreguntaBaseDatos");
const guardarPregunta = new GuardarPregunta();

class GenerarPregunta {
    // Método para ejecutar las operaciones
    async ejecutarOperaciones() {
        await preguntaWiki.leerYSacarConsultas();

        //si se ha generado pregunta, guardarla en la base de datos
        if (preguntaWiki.obtenerPregunta() !== undefined) {
            console.log("Pregunta generada: ", preguntaWiki.obtenerPregunta());
            guardarPregunta.guardarEnBaseDatos(preguntaWiki.obtenerPregunta());            
        }
    }
}

module.exports = GenerarPregunta;