const ObtenerPreguntaWikiData = require('./obtenerPreguntasWikidata');
const xml2js = require('xml2js');
const fs = require('fs');
const axios = require('axios');

jest.mock('axios');

describe('ObtenerPreguntaWikiData', () => {
    
      it('leerYSacarConsultas -> should read the XML file and resolve the promise if the file contain a correct format question', async () => {
        // Mock the fs.readFile function to return a sample XML data
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
          const xmlData = `
            <preguntas>
            <pregunta question="pais" type="capital"  category="geografia">
            <!-- Obtiene los paises y sus respectivas capitales -->
                <query>
                    SELECT DISTINCT ?countryLabel_es ?countryLabel_en (SAMPLE(?nombreCapital_es) AS ?capitales_es) (SAMPLE(?nombreCapital_en) AS ?capitales_en)
                    WHERE {
                        ?country wdt:P31 wd:Q3624078.  # Instancia de país
                        ?country wdt:P36 ?capital.  # Tiene capital
                        ?country rdfs:label ?countryLabel_es FILTER(LANG(?countryLabel_es) = "es").
                        ?country rdfs:label ?countryLabel_en FILTER(LANG(?countryLabel_en) = "en").
                        ?capital rdfs:label ?nombreCapital_es FILTER(LANG(?nombreCapital_es) = "es").
                        ?capital rdfs:label ?nombreCapital_en FILTER(LANG(?nombreCapital_en) = "en").
                        
                    }
                    GROUP BY ?countryLabel_es ?countryLabel_en
                </query>
            </pregunta>
            </preguntas>
          `;
          callback(null, xmlData);
        });
  
        const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
        // Mock leerYSacarConsultas (para que no se ejecuten las consultas)
        obtenerPreguntaWikiData.leerYSacarConsultas = jest.fn().mockResolvedValue();

        await obtenerPreguntaWikiData.leerYSacarConsultas();
  
      });

        it('leerYSacarConsultas -> should reject with an error if the XML file cannot be read', async () => {
            // Mock the fs.readFile function to simulate an error
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const error = new Error('Error reading the XML file');
            callback(error);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
    
            // Assert that the function rejects with an error
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('Error al leer el archivo de preguntas:');
        });

        it('leerYSacarConsultas -> should read the XML file and if the file is empty, it should return an error stating "No hay preguntas disponibles en el archivo"', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const xmlData = `
            `;
            callback(null, xmlData);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('No hay preguntas disponibles en el archivo');
        });

        it('leerYSacarConsultas -> should read the XML file and return an error', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                const xmlData = `
                <preguntas>
                
                </preguntas>
            `;
            callback(null, xmlData);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('No hay preguntas disponibles en el archivo');
        });

        it('leerYSacarConsultas -> should read the XML file and throw an error because the question does not have the correct structure', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const xmlData = `
                <preguntas>
                <pregunta type="capital"  category="geografia">
                <!-- Obtiene los paises y sus respectivas capitales -->
                    <query>
                        SELECT DISTINCT ?countryLabel_es ?countryLabel_en (SAMPLE(?nombreCapital_es) AS ?capitales_es) (SAMPLE(?nombreCapital_en) AS ?capitales_en)
                        WHERE {
                            ?country wdt:P31 wd:Q3624078.  # Instancia de país
                            ?country wdt:P36 ?capital.  # Tiene capital
                            ?country rdfs:label ?countryLabel_es FILTER(LANG(?countryLabel_es) = "es").
                            ?country rdfs:label ?countryLabel_en FILTER(LANG(?countryLabel_en) = "en").
                            ?capital rdfs:label ?nombreCapital_es FILTER(LANG(?nombreCapital_es) = "es").
                            ?capital rdfs:label ?nombreCapital_en FILTER(LANG(?nombreCapital_en) = "en").
                            
                        }
                        GROUP BY ?countryLabel_es ?countryLabel_en
                    </query>
                </pregunta>
                </preguntas>
            `;
            callback(null, xmlData);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('La pregunta no tiene la estructura correcta');
    
        });

        it('leerYSacarConsultas -> should read the XML file and throw an error because the question does not have the correct number of labels', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const xmlData = `
                <preguntas>
                <pregunta question="pais" type="capital"  category="geografia">
                <!-- Obtiene los paises y sus respectivas capitales -->
                    <query>
                        SELECT DISTINCT ?countryLabel_es (SAMPLE(?nombreCapital_es) AS ?capitales_es) (SAMPLE(?nombreCapital_en) AS ?capitales_en)
                        WHERE {
                            ?country wdt:P31 wd:Q3624078.  # Instancia de país
                            ?country wdt:P36 ?capital.  # Tiene capital
                            ?country rdfs:label ?countryLabel_es FILTER(LANG(?countryLabel_es) = "es").
                            ?country rdfs:label ?countryLabel_en FILTER(LANG(?countryLabel_en) = "en").
                            ?capital rdfs:label ?nombreCapital_es FILTER(LANG(?nombreCapital_es) = "es").
                            ?capital rdfs:label ?nombreCapital_en FILTER(LANG(?nombreCapital_en) = "en").
                            
                        }
                        GROUP BY ?countryLabel_es ?countryLabel_en
                    </query>
                </pregunta>
                </preguntas>
            `;
            callback(null, xmlData);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('La consulta no tiene el formato correcto para las labels');
    
        });

        it('leerYSacarConsultas -> should reject with an error if the XML cannot be parsed', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const xmlData = `<preguntas></preguntas>`;
            callback(null, xmlData);
            });
        
            // Mock xml2js.parseString to call its callback with an error
            jest.spyOn(xml2js, 'parseString').mockImplementation((xml, callback) => {
            const error = new Error('Error parsing XML');
            callback(error);
            });
        
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
        
            // Assert that the function rejects with the expected error
            await expect(obtenerPreguntaWikiData.leerYSacarConsultas()).rejects.toThrowError('Error al analizar el XML:');
        });
      
        //faltaria testear el metodo obtenerEntidadesConsulta caso positivo

        it('obtenerEntidadesConsulta -> should handle an error from the Wikidata API', async () => {
            // Mock the axios.get function to return a rejected promise with an error
            axios.get.mockRejectedValue(new Error('API error'));
          
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
          
            // Call the function and assert that it rejects with the expected error
            await expect(obtenerPreguntaWikiData.obtenerEntidadesConsulta('your query')).rejects.toThrowError('Error al obtener las entidades de wikidata:');
        });

        it('obtenerInformacionParaPregunta -> should process the data and generate a question', async () => {
            const data = {
              results: {
                bindings: [
                  { label1: 'mock value'},
                  { label2 : 'mock value'},
                  { label3 : 'mock value'},
                  { label4 : 'mock value'},
                  { label5 : 'mock value'},
                  { label6 : 'mock value'}
                ]
              }
            };
          
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.labels = ['label1', 'label2', 'label3', 'label4', 'label5', 'label6'];
            obtenerPreguntaWikiData.obtenerValorPropiedad = jest.fn().mockReturnValue('mock value');
            obtenerPreguntaWikiData.generarTextoPregunta = jest.fn().mockResolvedValue();
          
            await obtenerPreguntaWikiData.obtenerInformacionParaPregunta(data);
          
            // Assert that obtenerValorPropiedad was called with the expected arguments
            expect(obtenerPreguntaWikiData.obtenerValorPropiedad).toHaveBeenCalledWith(data.results.bindings[0], obtenerPreguntaWikiData.labels[0]);
          
            // Assert that generarTextoPregunta was called
            expect(obtenerPreguntaWikiData.generarTextoPregunta).toHaveBeenCalled();
        });

        it('obtenerValorPropiedad -> should return the property value if it exists', () => {
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.esFormatoISO8601 = jest.fn().mockReturnValue(false);
            
            const binding = {
              propertyName: { value: 'mock value' }
            };
      
            const result = obtenerPreguntaWikiData.obtenerValorPropiedad(binding, 'propertyName');
      
            expect(result).toEqual('mock value');
          });
      
          it('obtenerValorPropiedad -> should return "Ninguna de las anteriores" if the property does not exist', () => {
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            
            const binding = {};
      
            const result = obtenerPreguntaWikiData.obtenerValorPropiedad(binding, 'propertyName');
      
            expect(result).toEqual('Ninguna de las anteriores');
          });
      
        it('obtenerValorPropiedad -> should return the formatted date if the property value is a date', () => {
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.esFormatoISO8601 = jest.fn().mockReturnValue(true);
            obtenerPreguntaWikiData.formatearFecha = jest.fn().mockReturnValue('formatted date');
            
            const binding = {
              propertyName: { value: '2022-01-01T00:00:00Z' }
            };
      
            const result = obtenerPreguntaWikiData.obtenerValorPropiedad(binding, 'propertyName');
      
            expect(result).toEqual('formatted date');
        });

        it('generarTextoPregunta -> should reject with an error if the XML file cannot be analize', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                const xmlData = `
                <preguntas>
                <pregunta question="pais" type="capital"  category="geografia">
                <!-- Obtiene los paises y sus respectivas capitales -->
                    <query>
                        SELECT DISTINCT ?countryLabel_es ?countryLabel_en (SAMPLE(?nombreCapital_es) AS ?capitales_es) (SAMPLE(?nombreCapital_en) AS ?capitales_en)
                        WHERE {
                            ?country wdt:P31 wd:Q3624078.  # Instancia de país
                            ?country wdt:P36 ?capital.  # Tiene capital
                            ?country rdfs:label ?countryLabel_es FILTER(LANG(?countryLabel_es) = "es").
                            ?country rdfs:label ?countryLabel_en FILTER(LANG(?countryLabel_en) = "en").
                            ?capital rdfs:label ?nombreCapital_es FILTER(LANG(?nombreCapital_es) = "es").
                            ?capital rdfs:label ?nombreCapital_en FILTER(LANG(?nombreCapital_en) = "en").
                            
                        }
                        GROUP BY ?countryLabel_es ?countryLabel_en
                    </query>
                </pregunta>
                </preguntas>
                `;
                callback(null, xmlData);
            });
        
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
    
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrowError('Error al analizar el esqueleto de las preguntas:');
        });

        it('generarTextoPregunta -> should reject with an error if the XML file cannot be read', async () => {
            // Mock the fs.readFile function to simulate an error
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            const error = new Error('Error reading the XML file');
            callback(error);
            });
    
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
    
            // Assert that the function rejects with an error
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrowError('Error al leer el esqueleto de las preguntas:');
        });
          
        it('generarTextoPregunta -> should reject the promise if there are no question skeletons available', async () => {
            fs.readFile.mockImplementation((path, encoding, callback) => callback(null, 'mock data'));
            
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
      
            // Test when result is null
            xml2js.parseString.mockImplementation((data, callback) => callback(null, null));
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No hay esqueletos de preguntas disponibles');
      
            // Test when result.textoPreguntas is null
            xml2js.parseString.mockImplementation((data, callback) => callback(null, {}));
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No hay esqueletos de preguntas disponibles');
      
            // Test when result.textoPreguntas.pregunta is null
            xml2js.parseString.mockImplementation((data, callback) => callback(null, { textoPreguntas: {} }));
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No hay esqueletos de preguntas disponibles');
        });

        it('generarTextoPregunta -> should reject the promise if the question text is not found for Spanish or English', async () => {
            const mockData = {
              textoPreguntas: {
                pregunta: ['mock question']
              }
            };
      
            fs.readFile.mockImplementation((path, encoding, callback) => callback(null, 'mock data'));
            xml2js.parseString.mockImplementation((data, callback) => callback(null, mockData));
      
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
      
            // Test when obtenerTextoPregunta returns an empty string for Spanish
            obtenerPreguntaWikiData.obtenerTextoPregunta = jest.fn().mockReturnValueOnce('').mockReturnValue('mock question');
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No se ha encontrado el texto de la pregunta para español o para ingles');
      
            // Test when obtenerTextoPregunta returns an empty string for English
            obtenerPreguntaWikiData.obtenerTextoPregunta = jest.fn().mockReturnValueOnce('mock question').mockReturnValue('');
            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No se ha encontrado el texto de la pregunta para español o para ingles');
        });

        it('generarTextoPregunta -> should reject with an error if the question is not valid', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                const xmlData = `
                <textoPreguntas>
                    <pregunta question="pais" type="capital"> 
                        <es>¿Cuál es la capital de {RELLENAR}?</es>
                        <en>What is the capital of {RELLENAR}?</en>
                    </pregunta>
                </textoPreguntas>
                `;
                callback(null, xmlData);
            });

            // Mock the xml2js.parseString function to return a sample parsed data
            jest.spyOn(xml2js, 'parseString').mockImplementation((data, callback) => {
                const result = {
                    textoPreguntas: {
                        pregunta: [
                            {
                                $: {
                                    question: 'pais',
                                    type: 'capital'
                                },
                                es: ['¿Cuál es la capital de {RELLENAR}?'],
                                en: ['What is the capital of {RELLENAR}?']
                            }
                        ]
                    }
                };
                callback(null, result);
            });

            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.answers = [
              { label_es: 'Q67890', label_en: 'None of the above' },
              { label_es: 'Q12345', label_en: 'Q12345' },
              { label_es: 'Q67890 correcta', label_en: 'Correct question' },
              { label_es: 'Q67890', label_en: 'Q67890' },
            ];

            obtenerPreguntaWikiData.question = 'pais';
            obtenerPreguntaWikiData.type = 'capital';

            await expect(obtenerPreguntaWikiData.generarTextoPregunta()).rejects.toThrow('No se ha encontrado una entidad válida para hacer la pregunta');        
        });

        it('generarTextoPregunta -> should generate the question', async () => {
            // Mock the fs.readFile function to return a sample XML data
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                const xmlData = `
                <textoPreguntas>
                    <pregunta question="pais" type="capital"> 
                        <es>¿Cuál es la capital de {RELLENAR}?</es>
                        <en>What is the capital of {RELLENAR}?</en>
                    </pregunta>
                </textoPreguntas>
                `;
                callback(null, xmlData);
            });

            // Mock the xml2js.parseString function to return a sample parsed data
            jest.spyOn(xml2js, 'parseString').mockImplementation((data, callback) => {
                const result = {
                    textoPreguntas: {
                        pregunta: [
                            {
                                $: {
                                    question: 'pais',
                                    type: 'capital'
                                },
                                es: ['¿Cuál es la capital de {RELLENAR}?'],
                                en: ['What is the capital of {RELLENAR}?']
                            }
                        ]
                    }
                };
                callback(null, result);
            });

            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.answers = [
              { label_es: 'Madrid', label_en: 'Madrid' },
              { label_es: 'Q12345', label_en: 'Q12345' },
              { label_es: 'Q67890 correcta', label_en: 'Correct question' },
              { label_es: 'Q67890', label_en: 'Q67890' },
            ];

            obtenerPreguntaWikiData.question = 'pais';
            obtenerPreguntaWikiData.type = 'capital';

            obtenerPreguntaWikiData.generarTextoPregunta = jest.fn().mockResolvedValue();

            await obtenerPreguntaWikiData.generarTextoPregunta();       
        });

        it('should generate a question with the correct question and answer', async () => {
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.answers = [
              { result_es: 'Respuesta incorrecta 1', result_en: 'Incorrect answer 1' },
              { result_es: 'Respuesta correcta', result_en: 'Correct answer' },
              { result_es: 'Respuesta incorrecta 2', result_en: 'Incorrect answer 2' },
              { result_es: 'Respuesta incorrecta 3', result_en: 'Incorrect answer 3' },
            ];
            obtenerPreguntaWikiData.category = 'mock category';
            obtenerPreguntaWikiData.type = 'mock type';
            obtenerPreguntaWikiData.comprobarUndefined = jest.fn().mockReturnValue(false);
      
            await obtenerPreguntaWikiData.generarPregunta('Consulta ES', 'Respuesta correcta', 'Query EN', 'Correct answer');
      
            expect(obtenerPreguntaWikiData.finalQuestion).toEqual({
              question_es: 'Consulta ES',
              correct_es: 'Respuesta correcta',
              incorrect1_es: 'Respuesta incorrecta 1',
              incorrect2_es: 'Respuesta incorrecta 2',
              incorrect3_es: 'Respuesta incorrecta 3',
              question_en: 'Query EN',
              correct_en: 'Correct answer',
              incorrect1_en: 'Incorrect answer 1',
              incorrect2_en: 'Incorrect answer 2',
              incorrect3_en: 'Incorrect answer 3',
              category: 'mock category',
              type: 'mock type'
            });
          });
      
          it('should reject the promise if there is an undefined answer', async () => {
            const obtenerPreguntaWikiData = new ObtenerPreguntaWikiData();
            obtenerPreguntaWikiData.answers = [
              { result_es: undefined, result_en: 'Incorrect answer 1' },
              { result_es: 'Respuesta correcta', result_en: 'Correct answer' },
              { result_es: 'Respuesta incorrecta 2', result_en: 'Incorrect answer 2' },
              { result_es: 'Respuesta incorrecta 3', result_en: 'Incorrect answer 3' },
            ];
            obtenerPreguntaWikiData.category = 'mock category';
            obtenerPreguntaWikiData.type = 'mock type';
            
            await expect(obtenerPreguntaWikiData.generarPregunta('Consulta ES', 'Respuesta correcta', 'Query EN', 'Correct answer')).rejects.toThrow('Hay respuestas incorrectas con valor undefined');
          });
});