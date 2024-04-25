const express = require('express');
const axios = require('axios');
const cors = require('cors');
const promBundle = require('express-prom-bundle');

const app = express();
const port = 8000;

const serviceUrls = {
  auth: process.env.AUTH_SERVICE_URL || 'http://localhost:8002',
  user: process.env.USER_SERVICE_URL || 'http://localhost:8001',
  question: process.env.QUESTION_SERVICE_URL || 'http://localhost:8003',
  history: process.env.HISTORY_SERVICE_URL || 'http://localhost:8004',
  room: process.env.ROOM_SERVICE_URL || 'http://localhost:8005',
};

app.use(cors());
app.use(express.json());

// Prometheus configuration
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

const handleServiceRequest = async (req, res, serviceUrl) => {
  try {
    const serviceResponse = await axios[req.method.toLowerCase()](serviceUrl + req.url, req.body, { headers: req.headers });
    res.json(serviceResponse.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.response?.data?.error || 'Internal Server Error' });
  }
};

app.post('/login', (req, res) => handleServiceRequest(req, res, serviceUrls.auth));
app.post('/adduser', (req, res) => handleServiceRequest(req, res, serviceUrls.user));

//*********************ENDPOINTS DEL QUESTION SERVICE********************************************* */

app.get('/getQuestion', (req, res) => handleServiceRequest(req, res, serviceUrls.question, { params: req.query }));
app.get('/getQuestionDiaria', (req, res) => handleServiceRequest(req, res, serviceUrls.question, { params: req.query }));
app.get('/getQuestionModoBasico', (req, res) => handleServiceRequest(req, res, serviceUrls.question, { params: req.query }));
app.get('/getQuestionModoMismaCategoria', (req, res) => handleServiceRequest(req, res, serviceUrls.question, { params: req.query }));
app.get('/getQuestionModoCustom', (req, res) => handleServiceRequest(req, res, serviceUrls.question, { params: req.query }));
app.get('/generateQuestion', (req, res) => handleServiceRequest(req, res, serviceUrls.question));

//***************************** ENDPOINTS HISTORY-SERVICE*************************************************** */

app.get('/getHistoryDetallado', (req, res) => handleServiceRequest(req, res, serviceUrls.history, { params: req.query }));
app.get('/getHistoryTotal', (req, res) => handleServiceRequest(req, res, serviceUrls.history, { params: req.query }));
app.post('/updateHistory', (req, res) => handleServiceRequest(req, res, serviceUrls.history));
app.post('/updateHistoryDiaria', (req, res) => handleServiceRequest(req, res, serviceUrls.history));

//***************************************************endpoints de las salas */
app.get('/joinroom/:id/:username', async (req, res) => handleServiceRequest(req, res, serviceUrls.room, { params: req.params }));
app.get('/createroom/:username', async (req, res) => handleServiceRequest(req, res, serviceUrls.room, { params: req.params }));
app.get('/startgame/:id/:username', async (req, res) => handleServiceRequest(req, res, serviceUrls.room, { params: req.params }));

app.get('/getRankingDiarias', async (req, res) => handleServiceRequest(req, res, serviceUrls.history));// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server;