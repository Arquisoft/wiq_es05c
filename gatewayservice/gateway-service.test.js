const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 

afterAll(async () => {
    app.close();
  });

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    }
  });

  
// Test de /health endpoint
it('should perform the health request', async () => {
  const response = await request(app).get('/health').send();

  expect(response.statusCode).toBe(200);
});

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  

  //CAso de prueba para un endpoint inexistente


  it('should return 404 for nonexistent endpoint', async()=>{
    const response = await request(app)
    .get('/nonexistent');

    expect(response.statusCode).toBe(404);
  });
  

  // Test /getQuestion endpoint
  axios.get.mockImplementation((url, data) => {
    if (url.endsWith("/getQuestion")) {
      return Promise.resolve({
        data: [
          {
            pregunta: "¿Cuál es la capital de España?",
            respuestas: ["Madrid", "Paris", "Londres", "Berlin"],
            correcta: "Madrid"
          }
        ],
      });
    }
  });

  //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas falla.
  it('should handle error when fetching question', async () => {
    const questionServiceUrl = 'http://localhost:8003';
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      });

  it('should forward get question request to question service', async () => {
    const questionServiceUrl = 'http://localhost:8003'; 
    const data = {
      pregunta: '¿Cuál es la capital de Francia?',
      respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
      correcta: 'Helsinki',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    // Agrega tus expectativas aquí
  });

  it('should forward get question request to question generate service', async () => {
    const questionServiceUrl = 'http://localhost:8003/generateQuestions'; 
    const data = {
      pregunta: '¿Cuál es la capital de Francia?',
      respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
      correcta: 'Helsinki',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
    // Agrega tus expectativas aquí
  });

 //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas falla.
 it('should handle error when fetching question', async () => {
  const questionServiceUrl = 'http://localhost:8003/generateQuestions';
  const errorMessage = 'Network Error';
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    });

  



});
