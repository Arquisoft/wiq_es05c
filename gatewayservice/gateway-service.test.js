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

it('should handle authentication error', async () => {
  const authError = new Error('Authentication failed');
  authError.response = {
    status: 401,
    data: { error: 'Invalid credentials' },
  };

  // Simula un error en la llamada al servicio de autenticación
  axios.post.mockImplementationOnce(() => Promise.reject(authError));

  // Realiza la solicitud al endpoint
  const response = await request(app).post('/login').send({ /* datos de autenticación */ });

  // Verifica que la respuesta tenga un código de estado 401
  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe('Invalid credentials');
});

  
    it('should handle authentication error', async () => {
      const authError = new Error('Authentication failed');
      authError.response = {
        status: 401,
        data: { error: 'Invalid credentials' },
      };
    
      // Simula un error en la llamada al servicio de autenticación
      axios.post.mockImplementationOnce(() => Promise.reject(authError));
    
      // Realiza la solicitud al endpoint
      const response = await request(app).post('/adduser').send({ /* datos de autenticación */ });
    
      // Verifica que la respuesta tenga un código de estado 401
      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

  //CAso de prueba para un endpoint inexistente


  it('should return 404 for nonexistent endpoint', async()=>{
    const response = await request(app)
    .get('/nonexistent');

    expect(response.statusCode).toBe(404);
  });

  
//*********************ENDPOINTS DEL QUESTION SERVICE********************************************* */



  //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas falla.
  it('should handle error when fetching question', async () => {
    const questionServiceUrl = 'http://localhost:8003';
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      });


  it('should forward get question request to question generate service', async () => {
    const questionServiceUrl = 'http://localhost:8003/generateQuestions'; 
    const data = {
      pregunta: '¿Cuál es la capital de Francia?',
      respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
      correcta: 'Helsinki',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
 
  });

 //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas falla.
 it('should handle error when fetching question', async () => {
  const questionServiceUrl = 'http://localhost:8003/generateQuestions';
  const errorMessage = 'Network Error';
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    });

  
 //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas modo basico falla.
 it('should handle error when fetching question mode basic', async () => {
  const questionServiceUrl = 'http://localhost:8003/getQuestionModoBasico';
  const errorMessage = 'Network Error';
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    });

it('should return an error when the question service request fails', async () => {
          // Mock the axios.get method to reject the promise
          axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error('Error al realizar la solicitud al servicio de preguntas'))
          );
        
          const response = await request(app)
            .get('/getQuestion')
            .send({ id: 'mockedQuestionId' });
        
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de preguntas');
        });
it('should return an error when the question service request fails', async () => {
          // Mock the axios.get method to reject the promise
          axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error('Error al realizar la solicitud al servicio de preguntas'))
          );
      
          const response = await request(app).get('/getQuestionModoBasico');
      
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de preguntas');
        });
        
        it('should return an error when generating questions fails', async () => {
          const errorMessage = 'Error al realizar la solicitud al servicio de generacion de preguntas';
          axios.get.mockRejectedValue(new Error(errorMessage));
        
          const response = await request(app).get('/generateQuestions');
        
          expect(response.statusCode).toBe(500);
          expect(response.body.error).toBeDefined();
          expect(response.body.error).toEqual(errorMessage);
        });

        it('should return question data when the request is successful', async () => {
          // Mock the axios.get method to resolve the promise
          axios.get.mockResolvedValueOnce({ data: { question: 'mockedQuestionData' } });
      
          const response = await request(app).get('/getQuestionModoBasico');
      
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({ question: 'mockedQuestionData' });
        });
//***************************** ENDPOINTS HISTORY-SERVICE*************************************************** */

it('should return an error when the history service request fails', async () => {
  // Mock the axios.get method to reject the promise
  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error('Error al realizar la solicitud al servicio de historial'))
  );

  const response = await request(app).get('/getHistoryDetallado');

  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de historial');
});

it('should return an error when the total history service request fails', async () => {
  // Mock the axios.get method to reject the promise
  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error('Error al realizar la solicitud al servicio de historial'))
  );

  const response = await request(app).get('/getHistoryTotal');

  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de historial');
});
   
});