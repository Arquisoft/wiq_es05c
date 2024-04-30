const { MongoMemoryServer } = require('mongodb-memory-server');
const testQuestions = require('./testQuestions.js');

let mongoserver;
let userservice;
let authservice;
let historyservice;
let questionservice;
let gatewayservice;
let roomservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    console.log('Mongo uri: ', mongoUri);

    process.env.QUESTION_SERVICE_URL_ROOM = 'http://localhost:8000';

    userservice = await require("../../users/userservice/user-service");
    authservice = await require("../../users/authservice/auth-service");
    historyservice = await require("../../historyservice/history-service");
    questionservice = await require("../../questionservice/question-service");
    gatewayservice = await require("../../gatewayservice/gateway-service");    
    roomservice = await require("../../roomservice/room-service");

    testQuestions.insertTestData();
  }

  startServer();