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
const roomServiceUrl = process.env.ROOM_SERVICE_URL || 'http://localhost:8005';
app.use(cors());
app.use(express.json());

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});


;
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
    let idioma = req.query.idioma;

    //si no se le paso bien el idioma, por defecto es en
    if(idioma === undefined) 
      idioma = "en";

    // llamamos al servicio de preguntas
    const questionResponse = await axios.get(`${questionServiceUrl}/getQuestion?idioma=${idioma}`, req.body);
    
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas para obtener una pregunta'});
  }
});

app.get('/getQuestionDiaria', async (req, res) => {
  try {
    let idioma = req.query.idioma;
    let fecha = req.query.fecha;

    //si no se le paso bien el idioma, por defecto es en
    if(idioma === undefined) 
      idioma = "en";

    if(fecha === undefined)
      fecha = new Date().toISOString().slice(0, 10);
    console.log("fecha: " + fecha); 

    // llamamos al servicio de preguntas
    const questionResponse = await axios.get(`${questionServiceUrl}/getQuestionDiaria?idioma=${idioma}&fecha=${fecha}`, req.body);
    
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas' });
  }
});


app.get('/getQuestionModoBasico', async (req, res) => {
  console.log("entra gatewayGetModoBasico");
  try {    
    // Obtener el idioma en el que esta la app
    let idioma = req.query.idioma;
    console.log("entro en getQuestionModoBasico " + idioma);

    //si no se le paso bien el idioma, por defecto es en
    if(idioma === undefined) 
      idioma = "en";

    // llamamos al servicio de preguntas    
    const questionResponse = await axios.get(`${questionServiceUrl}/getQuestionModoBasico?idioma=${idioma}`, req.body);
  
    console.log("getQuestionModoBasico response: ", questionResponse.data);
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 
    console.error(error); // Imprime el error
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas modo basico' });

  }
});


app.get('/getQuestionModoMismaCategoria', async (req, res) => {
  console.log("entro en getQuestionModoMismaCategoria");
  try {    
    // Obtener el idioma en el que esta la app
    let idioma = req.query.idioma;
    const categoria = req.query.categoria;

  //si no se le paso bien el idioma, por defecto es en
  if(idioma === undefined) 
  idioma = "en";

    // llamamos al servicio de preguntas    
    const questionResponse = await axios.get(`${questionServiceUrl}/getQuestionModoMismaCategoria?idioma=${idioma}&categoria=${categoria}`, req.body);
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 

    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas modo misma categoria' });

  }
});


app.get('/getQuestionModoCustom', async (req, res) => {
  try {    
    // Obtener el idioma en el que esta la app
    let idioma = req.query.idioma;
    const numPreguntas = req.query.numPreguntas;

    //si no se le paso bien el idioma, por defecto es en
    if(idioma === undefined) 
     idioma = "en";

    // llamamos al servicio de preguntas    
    const questionResponse = await axios.get(`${questionServiceUrl}/getQuestionModoCustom?idioma=${idioma}&numPreguntas=${numPreguntas}`, req.body);
    res.json(questionResponse.data);
  } catch (error) {
    //Modifico el error 

    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas modo basico' });

  }
});

app.get('/generateQuestion', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    await axios.get(questionServiceUrl+'/generateQuestion', req.body);        
    res.status(200).send("Pregunta generada y guardada correctamente.");
  } catch (error) {
    //Modifico el error
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de generacion de preguntas' });
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
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial detallado' });
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
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial total' });
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

//***************************************************endpoints de las salas */
app.get('/joinroom/:id/:username',async(req,res)=> {
  try {
    console.log("controlador gateway parametros"+req.params);
    const { id,username } = req.params;
    const roomQuestionsResult = await axios.get(`${roomServiceUrl}/joinroom/${id}/${username}`);
    res.json(roomQuestionsResult.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de preguntas' });
  }
});
app.get('/createroom/:username',async(req,res)=> {
  try {
    const {username}=req.params;
    //crea la sala y te une dentro 
    //room es el id  
    const room = await axios.get(`${roomServiceUrl}/createroom/${username}`);
    res.json(room.data);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error al crear la sala' });
  }
});
app.get('/startgame/:id/:username',async(req,res)=> {
  try {
    const {id,username}=req.params;
    //crea la sala y te une dentro 
    //room es el id  
    const room = await axios.get(`${roomServiceUrl}/startgame/${username}`);
    res.json(room.data);

  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Error al crear la sala' });
  }
});


app.get('/getRankingDiarias', async (req, res) => {
  try {
    // llamamos al servicio de preguntas
    console.log("empiezo ranking diarias");
    const historyResponse = await axios.get(historyServiceUrl+'/getRankingDiarias');
    console.log("paso por el ranking diarias");
    res.json(historyResponse.data);
  } catch (error) {
    //Modifico el error 
    console.log("error ranking diarias");
    res.status(500).json({ error: 'Error al realizar la solicitud al servicio de historial' });
  }
});

// Start the gateway service
const server = app.listen(port, () => {
  console.log(`Gateway Service listening at http://localhost:${port}`);
});

module.exports = server
