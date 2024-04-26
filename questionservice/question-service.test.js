
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const testQuestions = require('../webapp/e2e/testQuestions.js');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./question-service');
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});


describe('endpoints casos negativos', () => {

    it('GET /getQuestion -> should return a question', async () => {
      const res = await request(app).get('/getQuestion').query({ idioma: 'es' });
  
      expect(res.statusCode).toEqual(500);
    });
  
    it('GET /getQuestionDiaria -> should return a daily question', async () => {
      //obtenemos la fecha de hoy 
      const today = new Date();
  
      // Obtener el año, el mes y el día de la fecha actual
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
      const day = String(today.getDate()).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
  
      // Formatear la fecha como YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day}`;
  
      const res = await request(app).get('/getQuestionDiaria').query({ idioma: 'es', fecha: formattedDate });
  
      expect(res.statusCode).toEqual(500);
    });
  
    it('GET /getQuestionModoBasico -> should return 10 questions', async () => {
      const res = await request(app).get('/getQuestionModoBasico').query({ idioma: 'es' });
  
      expect(res.statusCode).toEqual(500);
  
    });
  
    it('GET /getQuestionModoMismaCategoria -> should return 10 questions', async () => {
      const res = await request(app).get('/getQuestionModoMismaCategoria').query({ idioma: 'es', categoria: 'arte'});
  
      expect(res.statusCode).toEqual(500);
    });
  
    it('GET /getQuestionModoCustom -> should return questions', async () => {
      const res = await request(app).get('/getQuestionModoCustom').query({ idioma: 'es', numPreguntas: 1});
  
      expect(res.statusCode).toEqual(500);
    });
});

describe('endpoints casos positivos', () => {

    beforeAll(async () => {
        //insertamos los datos de prueba
        await testQuestions.insertTestData();
    });

  it('GET /getQuestion -> should return a question', async () => {
    const res = await request(app).get('/getQuestion').query({ idioma: 'es' });

    expect(res.statusCode).toEqual(200);
  });

  it('GET /getQuestionDiaria -> should return a daily question', async () => {
    //obtenemos la fecha de hoy 
    const today = new Date();

    // Obtener el año, el mes y el día de la fecha actual
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
    const day = String(today.getDate()).padStart(2, '0'); // Agregar ceros a la izquierda si es necesario

    // Formatear la fecha como YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    const res = await request(app).get('/getQuestionDiaria').query({ idioma: 'es', fecha: formattedDate });

    expect(res.statusCode).toEqual(200);
  });

  it('GET /getQuestionModoBasico -> should return 10 questions', async () => {
    const res = await request(app).get('/getQuestionModoBasico').query({ idioma: 'es' });

    expect(res.statusCode).toEqual(200);

    //comprobamos que devuelve 10 preguntas
    expect(Object.keys(res.body).length).toEqual(10);

  });

  it('GET /getQuestionModoMismaCategoria -> should return 10 questions', async () => {
    const res = await request(app).get('/getQuestionModoMismaCategoria').query({ idioma: 'es', categoria: 'arte'});

    expect(res.statusCode).toEqual(200);

    //comprobamos que devuelve 10 preguntas
    expect(Object.keys(res.body).length).toEqual(10);
  });

  it('GET /getQuestionModoCustom -> should return questions', async () => {
    const res = await request(app).get('/getQuestionModoCustom').query({ idioma: 'es', numPreguntas: 1});

    expect(res.statusCode).toEqual(200);

    //comprobamos que devuelve 10 preguntas
    expect(Object.keys(res.body).length).toEqual(1);
  });
});


