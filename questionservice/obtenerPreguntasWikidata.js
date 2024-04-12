const xml2js = require('xml2js');
const fs = require('fs');
const axios = require('axios');

class ObtenerPreguntaWikiData {
    
    constructor() {
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
            reject(new Error('Error al leer el archivo:', err));
            return;
          }
          
          // Parsear el XML
          xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
              reject(new Error('Error al analizar el XML:', parseErr));
              return;
            }

            if(!result || !result.preguntas || !result.preguntas.pregunta){
              reject(new Error('No hay preguntas disponibles en el archivo'));
              return;
            }

            // Obtener las preguntas disponibles
            var preguntas = result.preguntas.pregunta;

            //comprobamos si hay preguntas disponibles
            if(preguntas.length === 0){
              reject(new Error('No hay preguntas disponibles'));
              return;
            }
          
            // Seleccionar una pregunta aleatoria
            var pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
          
            //comprobamos si tenemos todos los datos disponibles
            if(!pregunta.$.question || !pregunta.$.type || !pregunta.$.category){
              reject(new Error('La pregunta no tiene la estructura correcta'));
              return;
            }

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
            
            //comprobamos que tenemos el numero de labels correcto
            if(this.labels.length !== 6){
              reject(new Error('La consulta no tiene el formato correcto para las labels'));
              return;
            }

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
          reject(new Error('Error al obtener las entidades de wikidata:', error));
          return;
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
                //obtenemos el label de la "pregunta" (ejemplo country) en español
                label_es: this.obtenerValorPropiedad(binding, this.labels[0]),
                //obtenemos el label de la "respuesta" (ejemplo capital) en español
                result_es: this.obtenerValorPropiedad(binding, this.labels[3]),
                
                //obtenemos el label de la "pregunta" (ejemplo country) en ingles
                label_en: this.obtenerValorPropiedad(binding, this.labels[1]),
                //obtenemos el label de la "respuesta" (ejemplo capital) en ingles
                result_en: this.obtenerValorPropiedad(binding, this.labels[5])
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
            //devolvemos la fecha formateada dependiendo del idioma
            return this.formatearFecha(binding[propertyName].value, propertyName.substring(propertyName.length - 2));
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
            reject(new Error('Error al leer el esqueleto de las preguntas:', err));
            return;
          }

          //parseamos el xml
          xml2js.parseString(data, (parseErr, result) => {
            if (parseErr) {
              reject(new Error('Error al analizar el esqueleto de las preguntas:', parseErr));
              return;
            } 

            if(!result || !result.textoPreguntas || !result.textoPreguntas.pregunta){
              reject(new Error('No hay esqueletos de preguntas disponibles'));
              return;
            }
            else{
              var preguntas = result.textoPreguntas.pregunta;            

              //obtenemos el esqueleto de la pregunta que queremos hacer
              var textoPreguntaEspañol = this.obtenerTextoPregunta(preguntas, this.question, this.type, "es");
              var textoPreguntaIngles = this.obtenerTextoPregunta(preguntas, this.question, this.type, "en");

              //comprobamos si se ha encontrado el texto de la pregunta
              if(textoPreguntaEspañol === "" || textoPreguntaIngles === "") {
                reject(new Error('No se ha encontrado el texto de la pregunta para español o para ingles'));
                return;
              }

              console.log("Texto pregunta español: ", textoPreguntaEspañol);
              console.log("Texto pregunta ingles: ", textoPreguntaIngles);
              
              //para comprobar si es un Q
              var regex = /^Q\d+/;
              //comprobamos que el resultado es valido para hacer la pregunta (que no sea QXXXXX)
              var preguntaCorrecta = this.answers.find(entidad => {
                return entidad.label_es !== "Ninguna de las anteriores" && !regex.test(entidad.label_es) && entidad.label_en !== "Ninguna de las anteriores" && !regex.test(entidad.label_en);
              });

              if(preguntaCorrecta){
                //rellenamos el esqueleto de la pregunta con los datos de la entidad
                //para generarla en español
                var pregunta_es = preguntaCorrecta.label_es;
                var respuestaCorrecta_es = preguntaCorrecta.result_es;
                var consulta_es = textoPreguntaEspañol.replace('{RELLENAR}', pregunta_es);
                //para generarla en inglés
                var pregunta_en = preguntaCorrecta.label_en;
                var respuestaCorrecta_en = preguntaCorrecta.result_en;
                var consulta_en = textoPreguntaIngles.replace('{RELLENAR}', pregunta_en);

                this.generarPregunta(consulta_es, respuestaCorrecta_es, consulta_en, respuestaCorrecta_en)
                  .then(() => resolve())
                  .catch(error => reject(error));                       
              }
              
              //si no hay pregunta resolvemos la promesa
              else{
                reject(new Error('No se ha encontrado una entidad válida para hacer la pregunta'));
                return;
              }
          }
          });
        });
      });
    }

    /*
      obtenemos el texto de la pregunta que queremos hacer
    */
    obtenerTextoPregunta(preguntas, question, type, idioma) {
      for (var pregunta of preguntas) {
        //si no tiene alguno de los datos que necesitamos
        if(!pregunta.$.question || !pregunta.$.type){
          return "";
        }
        //comprobamos si es la pregunta que queremos
        if (pregunta.$.question === question && pregunta.$.type === type) {
          if(idioma === "es"){
            console.log("Pregunta: ", pregunta.es[0]);
            return pregunta.es[0];
          }
          else if(idioma === "en")
            return pregunta.en[0];
        }
      }
      return "";
    }

    /* 
      generamos un json con la info necesaria de la pregunta para poder guardarla en la base de datos
    */
    generarPregunta(consulta_es, respuestaCorrecta_es, consulta_en, respuestaCorrecta_en){
      return new Promise((resolve, reject) => {
        var respuestasIncorrectas = [];
        var num = 0;

        //añadimos el resto de respuestas en español
        for(var i = 0; i < this.answers.length; i++){
          if(this.answers[i].result_es !== respuestaCorrecta_es){
            respuestasIncorrectas[num] = this.answers[i].result_es;
            num++;
          }
        }

        //añadimos el resto de respuestas en inglés
        for(var i = 0; i < this.answers.length; i++){
          if(this.answers[i].result_en !== respuestaCorrecta_en){
            respuestasIncorrectas[num] = this.answers[i].result_en;
            num++;
          }
        }

        //comprobar si hay alguno con undefined
        var hayUndefined = this.comprobarUndefined(respuestasIncorrectas);

        if(!hayUndefined){
          //guardamos la pregunta para añadirla a la base de datos
          this.finalQuestion = {
            //para español
            question_es: consulta_es.trim().replace(/\r?\n|\r/g, ''),
            correct_es: respuestaCorrecta_es,
            incorrect1_es: respuestasIncorrectas[0],
            incorrect2_es: respuestasIncorrectas[1],
            incorrect3_es: respuestasIncorrectas[2],
            
            //para ingles
            question_en: consulta_en.trim().replace(/\r?\n|\r/g, ''),
            correct_en: respuestaCorrecta_en,
            incorrect1_en: respuestasIncorrectas[3],
            incorrect2_en: respuestasIncorrectas[4],
            incorrect3_en: respuestasIncorrectas[5],

            category: this.category,
            type: this.type
          }         

          resolve();
        }
        else{
          reject(new Error('Hay respuestas incorrectas con valor undefined'));
        }

      });
    }   

    /*
      comprobamos si hay algún undefined en las respuestas incorrectas
      añadido porque a veces las respuestas eran undefined y tiraba el question service
    */
    comprobarUndefined(respuestasIncorrectas){
      var hayUndefined = false;
      for(var i = 0; i < respuestasIncorrectas.length; i++){
        if(respuestasIncorrectas[i] === undefined){
          hayUndefined = true;
        }
      }
      return hayUndefined;
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
  formatearFecha(fechaISO8601, idioma) {
    if(idioma === "en"){
      return this.formatearFechaIngles(fechaISO8601);
    }
    else{
      return this.formatearFechaEspañol(fechaISO8601);
    }
  }
  
  /*
    formateamos la fecha a un formato más legible en español
  */
  formatearFechaEspañol(fechaISO8601) {
    var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    var fecha = new Date(fechaISO8601);
    var dia = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var año = fecha.getFullYear();
    return dia + " de " + mes + " de " + año;
  }

  /*
    formateamos la fecha a un formato más legible en inglés
  */
  formatearFechaIngles(fechaISO8601) {
    var fecha = new Date(fechaISO8601);
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var año = fecha.getFullYear();
    return mes + "/" + dia + "/" + año;
  }
  
}

module.exports = ObtenerPreguntaWikiData;