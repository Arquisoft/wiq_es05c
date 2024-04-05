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


//Caso positivo para el endpoint /getQuestion
it('should perform the getQuestion request', async () => {
  const response = await request(app).get('/getQuestion').send();
  expect(response.statusCode).toBe(200);
  const data = {
    pregunta: '¿Cuál es la capital de Francia?',
    respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
    correcta: 'Paris',
  };
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
});

//Caso positivo para el endpoint /getQuestionDiario
it('should perform the getQuestionDiario request', async () => {
  const response = await request(app).get('/getQuestionDiaria').send();
  expect(response.statusCode).toBe(200);
  const data = {
    pregunta: '¿Cuál es la capital de Francia?',
    respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
    correcta: 'Paris',
  };
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
});


//Caso positivo para el endpoint /getQuestionModoBasico
it('should perform the getQuestion modo basico request', async () => {
  const response = await request(app).get('/getQuestionModoBasico').send();
  expect(response.statusCode).toBe(200);
  const data = {
    pregunta: '¿Cuál es la capital de Francia?',
    respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
    correcta: 'Paris',
  };
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
});

  // Test /getQuestion endpoint
  axios.get.mockImplementation((url, data) => {
    if (url.endsWith("/getQuestion")) {
      return Promise.resolve({
        data: [
          {
            pregunta: "¿Cuál es la capital de Francia?",
            respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
            correcta: "Paris"
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
  //Casos de prueba para el endpoint /getQuestion
  it('should forward get question request to question service', async () => {
    const questionServiceUrl = 'http://localhost:8003'; 
    const expectedQuestion = '¿Cuál es la capital de Francia?';
    const expectedOptions = ['Berlin', 'Paris', 'Londres', 'Madrid'];
    const expectedCorrectAnswer = 'Paris';
  // Simula una llamada exitosa al servicio de preguntas
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
  // Realiza la solicitud al endpoint
    const response = await request(app).get('/getQuestion').send();
  // Verifica que la respuesta tenga un código de estado 200
    expect(response.statusCode).toBe(200);
  // Verifica que la pregunta y las opciones sean correctas
    expect(response.body.pregunta).toBe(expectedQuestion);
    expect(response.body.respuestas).toEqual(expect.arrayContaining(expectedOptions));
    expect(response.body.correcta).toBe(expectedCorrectAnswer);
  });

  //Caso de prueba para el endpoint /generateQuestion
  it('should forward get question request to question generate service', async () => {
    const questionServiceUrl = 'http://localhost:8003/generateQuestions'; 
    const data = {
      pregunta: '¿Cuál es la capital de Francia?',
      respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
      correcta: 'Paris',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
 
  });

 //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de preguntas falla.
 it('should handle error when fetching question', async () => {
  const questionServiceUrl = 'http://localhost:8003/generateQuestions';
  const errorMessage = 'Network Error';
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    });
  
 //Caso negativo para el endpoint /getQuestion   
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

//Caso negativo para el endpoint /getQuestionModoBasico
  it('should return an error when the question modo basico service request fails', async () => {
    // Mock the axios.get method to reject the promise
    axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error('Error al realizar la solicitud al servicio de preguntas modo basico'))
    );
    const response = await request(app)
                                  .get('/getQuestionModoBasico')
                                  .send({ id: 'mockedQuestionId' });
          
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de preguntas modo basico');
    });
  

//***************************** ENDPOINTS HISTORY-SERVICE*************************************************** */
//Caso positivo para el endpoint /getHistoryDetallado
it('should perform the getHistoryDetallado request', async () => {
  const response = await request(app).get('/getHistoryDetallado').send();
  expect(response.statusCode).toBe(200);
  const data = {
    usuario: 'testuser',
    preguntas: [
      {
        pregunta: '¿Cuál es la capital de Francia?',
        respuesta: 'Paris',
        correcta: true,
      },
    ],
  };
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
});

//Caso negativo para el endpoint /getHistoryDetallado
it('should return an error when the history detallado service request fails', async () => {
  // Mock the axios.get method to reject the promise
  axios.get.mockImplementationOnce(() =>
  Promise.reject(new Error('Error al realizar la solicitud al servicio de historial'))
  );
  const response = await request(app)
                                .get('/getHistoryDetallado')
                                .send({ id: 'mockedHistoryId' });
        
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de historial detallado');
  });
  
  //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de historial falla.
  it('should handle error when fetching history', async () => {
    const historyServiceUrl = 'http://localhost:8004';
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      });

  
  // Test /getHistoryTotal endpoint
  //Caso negativo para el endpoint /getHistoryTotal
  it('should return an error when the history total service request fails', async () => {
    // Mock the axios.get method to reject the promise
    axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error('Error al realizar la solicitud al servicio de historial'))
    );
    const response = await request(app)
                                  .get('/getHistoryTotal')
                                  .send({ id: 'mockedHistoryId' });
          
    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Error al realizar la solicitud al servicio de historial total');
    });
  //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de historial falla.
  it('should handle error when fetching history', async () => {
    const historyServiceUrl = 'http://localhost:8004';
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
      });
  

});