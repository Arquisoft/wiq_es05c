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
    } else if (url.endsWith('/getQuestionDiaria')) {
      return Promise.resolve({ data: { pregunta: 'mockedQuestion' } });
    }else if (url.endsWith('/getQuestionModoBasico')) {
      return Promise.resolve({ data: { pregunta: 'mockedQuestion' } });
    } else if (url.endsWith('/getQuestionModoMismaCategoria')) {
      return Promise.resolve({ data: { pregunta: 'mockedQuestion' } });
    } else if (url.endsWith('/getQuestionModoCustom')) {
      return Promise.resolve({ data: { pregunta: 'mockedQuestion' } });
    }else if (url.endsWith('/updateHistory')) {
      return Promise.resolve({ data: { pregunta: 'mockedHistory' } });
    }else if (url.endsWith('/updateHistoryDiaria')) {
      return Promise.resolve({ data: { pregunta: 'mockedHistory' } });
    }
  });
  
// Test de /health endpoint
it('should perform the health request', async () => {
  const response = await request(app).get('/health').send();
  expect(response.statusCode).toBe(200);
});

const handleAuthError = async (endpoint) => {
  const authError = new Error('Authentication failed');
  authError.response = {
    status: 401,
    data: { error: 'Invalid credentials' },
  };

  // Simula un error en la llamada al servicio de autenticación
  axios.post.mockImplementationOnce(() => Promise.reject(authError));

  // Realiza la solicitud al endpoint
  const response = await request(app).post(endpoint).send({ /* datos de autenticación */ });

  // Verifica que la respuesta tenga un código de estado 401
  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe('Invalid credentials');
};

it('should handle authentication error for /login', async () => {
  await handleAuthError('/login');
});

it('should handle authentication error for /adduser', async () => {
  await handleAuthError('/adduser');
});
//CAso de prueba para un endpoint inexistente
it('should return 404 for nonexistent endpoint', async()=>{
  const response = await request(app)
  .get('/nonexistent');
  expect(response.statusCode).toBe(404);
});

//*********************ENDPOINTS DEL QUESTION SERVICE********************************************* */

// Función para manejar errores en los metodos del questino service
const handleErrorResponse = async (route, errorMessage) => {
  const error = new Error(errorMessage);
  axios.get.mockImplementationOnce(() => Promise.reject(error));

  const response = await request(app).get(route).send();
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBe(errorMessage);
};

// Test para verificar manejo de errores en /getQuestionDiaria
it('should handle error when getting daily question', async () => {
  await handleErrorResponse('/getQuestionDiaria', 'Internal Server Error');
});

// Test para verificar manejo de errores en /getQuestionModoBasico
it('should handle error when getting basic question', async () => {
  await handleErrorResponse('/getQuestionModoBasico', 'Internal Server Error');
});

// Test para verificar manejo de errores en /getQuestionMismaCategoria
it('should handle error when getting same category question', async () => {
  await handleErrorResponse('/getQuestionModoMismaCategoria', 'Internal Server Error');
});

// Test para verificar manejo de errores en /getQuestionModoCustom
it('should handle error when getting custom question', async () => {
  await handleErrorResponse('/getQuestionModoCustom', 'Internal Server Error');
});


//Caso positivo para el endpoint /getQuestion
it('should perform the getQuestion request', async () => {
  const idioma = 'es';
  //para una pregunta
  const mockQuestion = {
    "resultado1":{
      "pregunta":"¿Cuál es la capital del pais Argelia?",
      "correcta":"Argel",
      "respuestasIncorrecta1":"Castries",
      "respuestasIncorrecta2":"Mogadiscio",
      "respuestasIncorrecta3":"Oslo"
    }
  };
  questionServiceUrl = 'http://localhost:8003';

  axios.get.mockResolvedValue({ data: mockQuestion });
  
  const response = await request(app).get(`/getQuestion?idioma=${idioma}`);

 // expect(axios.get).toHaveBeenCalledWith(`${questionServiceUrl}/getQuestion?idioma=${idioma}`, {});
  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual(mockQuestion);
});

// Función para manejar respuestas positivas en los metodos del question
const handlePositiveResponse = async (route) => {
  const response = await request(app).get(route).send();
  expect(response.statusCode).toBe(200);
  const data = {
    pregunta: '¿Cuál es la capital de Francia?',
    respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
    correcta: 'Paris',
  };
  axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
};

// Caso positivo para el endpoint /getQuestionDiario
it('should perform the getQuestionDiario request', async () => {
  await handlePositiveResponse('/getQuestionDiaria');
});

// Caso positivo para el endpoint /getQuestionModoBasico
it('should perform the getQuestion modo basico request', async () => {
  await handlePositiveResponse('/getQuestionModoBasico');
});

// Caso positivo modo misma categoria
it('should perform the getQuestion modo misma categoria request', async () => {
  const response = await request(app).get('/getQuestionModoMismaCategoria').send();
 
  // Se verifica que el idioma que toma sea undefined ya que no se ha indicado
  expect(response.body.idioma).toBe(undefined);
  await handlePositiveResponse('/getQuestionModoMismaCategoria');
});

// Caso positivo modo custom 
it('should perform the getQuestion modo custom request', async () => {
  await handlePositiveResponse('/getQuestionModoCustom');
});

// Caso positivo para el endpoint /generateQuestion
it('should perform the generateQuestion request', async () => {
  await handlePositiveResponse('/generateQuestion');
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
    const questionServiceUrl = 'http://localhost:8003/generateQuestion'; 
    const data = {
      pregunta: '¿Cuál es la capital de Francia?',
      respuestas: ['Berlin', 'Paris', 'Londres', 'Madrid'],
      correcta: 'Paris',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve({ data }));
 
  });
 
  //Caso negativo para el endpoint /generateQuestion
  it('should return an error when the question generate service request fails', async () => {
    // Mock the axios.get method to reject the promise
    axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error('Internal Server Error'))
    );
    const response = await request(app)
                                  .get('/generateQuestion')       
                                  .send({ id: 'mockedQuestionId' });

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toEqual('Internal Server Error');
    });
 

//Caso de prueba para el endpoint /getQuestionDiaria
it('should forward get question request to question diaria service', async () => {
  const questionServiceUrl = 'http://localhost:8003/getQuestionDiaria'; 
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
  Promise.reject(new Error('Internal Server Error'))
  );
  const response = await request(app)
                                .get('/getQuestion')
                                .send({ id: 'mockedQuestionId' });
        
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Internal Server Error');
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
  Promise.reject(new Error('Internal Server Error'))
  );
  const response = await request(app)
                                .get('/getHistoryDetallado')
                                .send({ id: 'mockedHistoryId' });
        
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Internal Server Error');
  });
  

  //Caso positivo para el endpoint /getHistoryDetallado
it('should perform the getHistoryTotal request', async () => {
  const response = await request(app).get('/getHistoryTotal').send();
});
 

    // Función para manejar errores en las pruebas
const handleErrorResponseHistory = async (serviceUrl, errorMessage) => {
  axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
  
};

// Verifica si el manejo de errores funciona correctamente para diferentes servicios
it('should handle error when fetching history', async () => {
  await handleErrorResponseHistory('http://localhost:8004', 'Network Error');
});

it('should handle error when fetching history total', async () => {
  await handleErrorResponseHistory('http://localhost:8004/getHistoryTotal', 'Network Error');
});

it('should handle error when fetching history detallado', async () => {
  await handleErrorResponseHistory('http://localhost:8004/getHistoryDetallado', 'Network Error');

});
 

it('should handle error when fetching history update', async () => {
  await handleErrorResponseHistory('http://localhost:8004/updateHistory', 'Network Error');
});

it('should handle error when fetching history diaria update', async () => {
  await handleErrorResponseHistory('http://localhost:8004/updateHistoryDiaria', 'Network Error');
});

 //Verifica si el manejo de errores funciona correctamente cuando la llamada al servicio de ranking diarias falla. 
 it('should handle error when fetching ranking diarias', async () => {
  await handleErrorResponseHistory('http://localhost:8004/getRankingDiarias', 'Network Error');
    });
//Caso negativo para el endpoint /updateHistory
it('should return an error when the history update service request fails', async () => {
  // Ejemplo de uso:
// Caso negativo para el endpoint /updateHistory
   handleErrorResponsePost('/updateHistory', 'Internal Server Error');

  });

  //Caso negativo para el endpoint /updateHistoryDiaria
it('should return an error when the history diaria update service request fails', async () => {
// Caso negativo para el endpoint /updateHistoryDiaria
handleErrorResponsePost('/updateHistoryDiaria', 'Internal Server Error');
  });

const handleErrorResponsePost = async (route, errorMessage) => {
  const error = new Error(errorMessage);
  axios.post.mockImplementationOnce(() => Promise.reject(error));

  const response = await request(app).post(route).send({ id: 'mockedHistoryId' });
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBe(errorMessage);
};
 //Caso negativo para el endpoint /getHistoryTotal
 it('should return an error when the history total service request fails', async () => {
  // Mock the axios.get method to reject the promise
  axios.get.mockImplementationOnce(() =>
  Promise.reject(new Error('Internal Server Error'))
  );
  const response = await request(app)
                                .get('/getHistoryTotal')
                                .send({ id: 'mockedHistoryId' });
        
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Internal Server Error');
  });


//Caso negativo para el endpoint /getRankingDiarias
it('should return an error when the ranking diarias service request fails', async () => {
  // Mock the axios.get method to reject the promise
  axios.get.mockImplementationOnce(() =>
  Promise.reject(new Error('Internal Server Error'))
  );
  const response = await request(app)
                                .get('/getRankingDiarias')
                                .send({ id: 'mockedRankingId' });
        
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
  expect(response.body.error).toEqual('Internal Server Error');
  });


//***************************************************endpoints de las salas */



});

