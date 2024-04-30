const { MongoClient, ObjectId} = require('mongodb');

async function insertTestData() {
    const uri = process.env.MONGODB_URI; 
    const client = new MongoClient(uri);

    console.log('Inserting test data... ' + uri);

    try {
        await client.connect(); 
        const database = client.db(); 

        // Colección de preguntas
        const questionsCollection = database.collection('preguntas');
        const categoryCollection = database.collection('categorias');
        const answersCollection = database.collection('respuestas');
        const typesCollection = database.collection('tipos');
  
        // insertamos las categorias
        await categoryCollection.insertMany([
            { 
                _id: new ObjectId('6611a60d494c408df0d0c1d5'),
                nombre: 'arte' }
        ]);

        // insertamos las respuestas
        await answersCollection.insertMany([
            { 
                _id : new ObjectId('6611a60d494c408df0d0c1e4'),
                textoRespuesta_es: '1 de enero de 2002', 
                textoRespuesta_en: '1/1/2002', 
                tipos: [new ObjectId('6611a60d494c408df0d0c1db')] 
            },
            { 
                _id : new ObjectId('6611a60d494c408df0d0c1e5'),
                textoRespuesta_es: '1 de febrero de 2002', 
                textoRespuesta_en: '1/2/2002', 
                tipos: [new ObjectId('6611a60d494c408df0d0c1db')] 
            },
            { 
                _id : new ObjectId('6611a60d494c408df0d0c1e6'),
                textoRespuesta_es: '1 de marzo de 2002', 
                textoRespuesta_en: '1/3/2002', 
                tipos: [new ObjectId('6611a60d494c408df0d0c1db')] 
            },
            { 
                _id : new ObjectId('6611a60d494c408df0d0c1e7'),
                textoRespuesta_es: '1 de ablir de 2002', 
                textoRespuesta_en: '1/4/2002', 
                tipos: [new ObjectId('6611a60d494c408df0d0c1db')] 
            }
        ]);

        // insertamos los tipos
        await typesCollection.insertMany([
            { 
                _id: new ObjectId('6611a60d494c408df0d0c1db'), 
                idPreguntas: 
                    ['abcdefabcdefabcdefabcde1'
                    , 'abcdefabcdefabcdefabcde2'
                    , 'abcdefabcdefabcdefabcde3'
                    , 'abcdefabcdefabcdefabcde4'
                    , 'abcdefabcdefabcdefabcde5'
                    , 'abcdefabcdefabcdefabcde6'
                    , 'abcdefabcdefabcdefabcde7'
                    , 'abcdefabcdefabcdefabcde8'
                    , 'abcdefabcdefabcdefabcde9'
                    , 'abcdefabcdefabcdefabcde0'] }
        ]);

        // para las preguntas
        const today = new Date();

        // Obtener el año, el mes y el día de la fecha actual
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
        const day = String(today.getDate()).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario

        // Formatear la fecha como YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;

        // Crear un array con 10 preguntas de prueba
        const testQuestions = Array(10).fill().map((_, index) => {
            return {
                _id: new ObjectId(`abcdefabcdefabcdefabcde${index}`),
                textoPregunta_es: '¿Cuál es la fecha de nacimiento del chef español Yayo Daporta?', 
                respuestaCorrecta_es: '1 de enero de 2002', 
                textoPregunta_en: 'What is the date of birth of the Spanish chef Yayo Daporta?', 
                respuestaCorrecta_en: '1/1/2002', 
                categoria: new ObjectId('6611a60d494c408df0d0c1d5')
            };
        });

        // ponemos a una pregunta el atributo diaria
        testQuestions[0].diaria = formattedDate;

        // insertamos las preguntas
        await questionsCollection.insertMany(testQuestions);        

    } finally {
        await client.close(); // Cerrar la conexión con la base de datos
    }
}

module.exports = { insertTestData };