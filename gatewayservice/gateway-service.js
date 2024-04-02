const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:8002';
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:8001';
const questionServiceUrl = process.env.QUESTION_SERVICE_URL || 'http://localhost:8003';
const historyServiceUrl = process.env.HISTORY_SERVICE_URL || 'http://localhost:8004';

app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

app.post('/login', async (req, res) => {
  try {
    console.log('Login request received');
    // Forward the login request to the authentication service
    const authResponse = await axios.post(authServiceUrl+'/login', req.body);
    console.log('Login request forwarded to authentication service');
    console.log('Response from authentication service:', authResponse.data);
    res.json(authResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    // Forward the add user request to the user service
    const userResponse = await axios.post(userServiceUrl+'/adduser', req.body);
    res.json(userResponse.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.response.data.error });
  }
});

//*********************ENDPOINTS DEL QUESTION SERVICE********************************************* */

app.get('/getQuestion', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const questionResponse = await axios.get(questionServiceUrl+'/getQuestion', req.body);
    
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas para obtener una pregunta -> ' + error.response.data.error});
  }
});

app.get('/getQuestionModoBasico', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const questionResponse = await axios.get(questionServiceUrl+'/getQuestionModoBasico', req.body);
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas para obtener las preguntas del modo básico -> ' + error.response.data.error});
  }
});

app.get('/generateQuestion', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    await axios.get(questionServiceUrl+'/generateQuestion', req.body);        
  } catch (error) {
    //Modifico el error
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de generacion de preguntas -> ' + error.response.data.error});
  }
});

//***************************** ENDPOINTS HISTORY-SERVICE*************************************************** */

app.get('/getHistoryDetallado', async (req, res) => {
  try {
    // Obtener el usuario de la consulta
    const usuario = req.query.usuario;

    // llamamos al servicio de preguntas
    const historyResponse = await axios.get(`${historyServiceUrl}/getHistoryDetallado?usuario=${usuario}`);
    
    res.json(historyResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial' });
  }
});

app.get('/getHistoryTotal', async (req, res) => {
  try {
    // Obtener el usuario de la consulta
    const usuario = req.query.usuario;
    // llamamos al servicio de preguntas
    const historyResponse = await axios.get(`${historyServiceUrl}/getHistoryTotal?usuario=${usuario}`);
    
    res.json(historyResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial' });
  }
});

app.post('/updateHistory', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    const historyResponse = await axios.post(historyServiceUrl+'/updateHistory', req.body);
    
    res.json(historyResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial' });
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
