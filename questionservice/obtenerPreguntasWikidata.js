const xml2js = require('xml2js');
const fs = require('fs');
const axios = require('axios');

class ObtenerPreguntaWikiData {
    
    constructor(language = 'es') {
        this.language = language;

        //obtenemos las labels de lo que queremos obtener (lo que esta en la select que queremos buscar)
        this.labels;       

        //obtenemos la información mas general de la pregunta (por ejemplo país)
        this.question;
        //obtenemos el "tipo" de la pregunta (por ejemplo capital)
        this.type;
        //obtenemos la categoría de la pregunta (por ejemplo geografia)
        this.category;
        //obtenemos las 4 posibles respuestas
        this.answers;

        //para guardar toda la información relativa a las preguntas
        this.finalQuestion;        
    }
    
    /*
        Leemos el archivo .xml que tenemos con todas las consultas disponibles
        Posteriormente se elige una consulta al azar
        Se obtiene la consulta y la información que necesitamos para posteriores métodos
    */
    leerYSacarConsultas() {   
      return new Promise((resolve, reject) => {
        // Leer el archivo XML
        fs.readFile('preguntas.xml', 'utf-8', (err, data) => {
          
          if (err) {
          console.error('Error al leer el archivo:', err);
            return;
          }
          
          // Parsear el XML
          xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
              console.error('Error al analizar el XML:', parseErr);
              return;
            }
            // Obtener las preguntas disponibles
            var preguntas = result.preguntas.pregunta;
          
            // Seleccionar una pregunta aleatoria
            var pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
          
            // Obtener la información relativa a la pregunta
            this.question = pregunta.$.question;
            this.type = pregunta.$.type;
            this.category = pregunta.$.category;
          
            // Obtener la consulta
            var query = pregunta.query[0];
            //obtenemos lo que esta entre el select y el where
            var consultaParte = query.match(/SELECT(.*?)WHERE/s)[1].trim();

            //obtenemos las labels que necesitamos para la consulta
            var prueba = consultaParte.match(/\?(\w+)/g);            
            // Dividir la parte de la consulta por los símbolos '?' para obtener las labels 
            this.labels = prueba.map(match => {
              return match.slice(1); // Elimina el primer carácter "?" y muestra el resto
            });

            //obtenemos todas las entradas de wikidata para esa query
            this.obtenerEntidadesConsulta(query)
              .then(() => resolve())
              .catch(error => reject(error));
          });
        });
      });
    }

    /*
      Hace una llamada a la API para poder obtener la información relativa a la consulta
      Si la llamada tiene exito se llama a otro metodo para procesar la información
    */
    obtenerEntidadesConsulta(consulta){    
      return new Promise((resolve, reject) => { 
          const apiUrl = 'https://query.wikidata.org/sparql';
          
        axios.get(apiUrl, {
          params: {
              query: consulta,
              format: 'json'
          }
        })
        .then(response => {
            this.obtenerInformacionParaPregunta(response.data)
              .then(() => resolve())
              .catch(error => reject(error));
        })
        .catch(error => {
            console.error('Error:', error);
        });
      });
    }

    /*
      Obtenemos 4 entidades aleatorias de los datos devueltos por la consulta que hemos realizado
    */
    obtenerInformacionParaPregunta(data){
      return new Promise((resolve, reject) => {
        //obtenemos el label y el resultado de todas las entidades
        if(data && data.results && data.results.bindings.length > 0){
          var entidades = data.results.bindings.map(binding => {
            return {
                //obtenemos el label de la "pregunta" (ejemplo country)
                label: this.obtenerValorPropiedad(binding, this.labels[0]),
                //obtenemos el label de la "respuesta" (ejemplo capital)
                result: this.obtenerValorPropiedad(binding, this.labels[2])
            };
          });

          //obtenemos 4 índices aleatorios únicos
          var indicesAleatorios = [];
          while(indicesAleatorios.length < 4){
            var indiceAleatorio = Math.floor(Math.random() * entidades.length);
            if(!indicesAleatorios.includes(indiceAleatorio)){
              indicesAleatorios.push(indiceAleatorio);
            }
          }

          //obtenemos las 4 entidades aleatorias que vamos a utilizar para generar la pregunta
          this.answers = indicesAleatorios.map(indice => entidades[indice]);  

          this.generarTextoPregunta()
            .then(() => resolve())
            .catch(error => reject(error));
        } 
      });
    }    

    /*
      obtenemos el valor que queremos de la entidad
    */
    obtenerValorPropiedad(binding, propertyName) {
      //si tiene la propiedad
        if (binding && binding.hasOwnProperty(propertyName)) {
          //comprobamos si es una fecha
          if(this.esFormatoISO8601(binding[propertyName].value)){
            //devolvemos la fecha formateada
            return this.formatearFecha(binding[propertyName].value);
          }
          //si no es una fecha devolvemos el valor
          else{
            return binding[propertyName].value;
          }
        } else {
            return "Ninguna de las anteriores"; 
        }
    }

    /*
      generamos la pregunta con la información que hemos obtenido  
    */
    generarTextoPregunta(){
      return new Promise((resolve, reject) => {
        //leemos el archivo 
        fs.readFile('esqueletoPreguntas.xml', 'utf-8', (err, data) => {
          if (err) {
            console.error('Error al leer el esqueleto de las preguntas:', err);
              return;
          }

          //parseamos el xml
          xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
              console.error('Error al analizar el esqueleto de las preguntas:', parseErr);
              return;
            } 

            //obtenemos el esqueleto de la pregunta que queremos hacer
            var textoPregunta = this.obtenerTextoPregunta(result, this.question, this.type);
            
            //para comprobar si es un Q
            var regex = /^Q\d+/;
            //comprobamos que el resultado es valido para hacer la pregunta (que no sea QXXXXX)
            var preguntaCorrecta = this.answers.find(entidad => {
              return entidad.label !== "Ninguna de las anteriores" && !regex.test(entidad.label);
            });

            if(preguntaCorrecta){
              //rellenamos el esqueleto de la pregunta con los datos de la entidad
              var pregunta = preguntaCorrecta.label;
              var respuestaCorrecta = preguntaCorrecta.result;
              var consulta = textoPregunta.replace('{RELLENAR}', pregunta);

              this.generarPregunta(consulta, respuestaCorrecta)
                .then(() => resolve())
                .catch(error => reject(error));                       
            }
            
            //si no hay pregunta resolvemos la promesa
            else{
              resolve();
            }
          });
        });
        });
    }

    /*
      obtenemos el texto de la pregunta que queremos hacer
    */
    obtenerTextoPregunta(result, question, type) {
      var preguntas = result.textoPreguntas.pregunta;
      for (var pregunta of preguntas) {
          if (pregunta.$.question === question && pregunta.$.type === type) {
              return pregunta._;
          }
      }
      return "";
    }

    /* 
      generamos un json con la info necesaria de la pregunta para poder guardarla en la base de datos
    */
    generarPregunta(consulta, respuestaCorrecta){
      return new Promise((resolve, reject) => {
        var respuestasIncorrectas = [];
        var num = 0;
        //añadimos el resto de respuestas
        for(var i = 0; i < this.answers.length; i++){
          if(this.answers[i].result !== respuestaCorrecta){
            respuestasIncorrectas[num] = this.answers[i].result;
            num++;
          }
        }

        //guardamos la pregunta para añadirla a la base de datos
        this.finalQuestion = {
          question: consulta.trim().replace(/\r?\n|\r/g, ''),
          correct: respuestaCorrecta,
          incorrect1: respuestasIncorrectas[0],
          incorrect2: respuestasIncorrectas[1],
          incorrect3: respuestasIncorrectas[2],
          category: this.category,
          type: this.type
        }         

        resolve();
      });
    }   

    /*
      obtenemos la pregunta que hemos generado
    */
    obtenerPregunta(){
      return this.finalQuestion;
    }

    /*
      comprobamos si es una fecha en formato ISO 8601
    */
    esFormatoISO8601(cadena) {
      // Expresión regular para el formato ISO 8601
      var formatoISO8601 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
      return formatoISO8601.test(cadena);
  }

  /*
    formateamos la fecha a un formato más legible
  */
  formatearFecha(fechaISO8601) {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var fecha = new Date(fechaISO8601);
    var dia = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var año = fecha.getFullYear();
    return dia + " de " + mes + " de " + año;
  }
  
  
}

module.exports = ObtenerPreguntaWikiData;