const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./history-service');
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('endpoint historyervice', () => {  

  it('POST /updateHistory -> should add the history', async () => {
    const mockedHistory = {
      user: 'testuser',
      incorrectas: 1,
      correctas: 2,
      tiempoTotal: 3
    };
    const res = await request(app).post('/updateHistory').send(mockedHistory);

    expect(res.statusCode).toEqual(200);
  });

  it('POST /updateHistory -> should return an error if no user is provided', async () => {
    const mockedHistory = {
      incorrectas: 1,
      correctas: 2,
      tiempoTotal: 3
    };
    const res = await request(app).post('/updateHistory').send(mockedHistory);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
  
  it('POST /updateHistoryDiaria -> should add the history', async () => {
    const mockedHistory = {
      user: 'testuser'
    };
    const res = await request(app).post('/updateHistoryDiaria').send(mockedHistory);

    expect(res.statusCode).toEqual(200);
  });

  it('POST /updateHistoryDiaria -> should return an error if no user is provided', async () => {
    const mockedHistory = {
    };
    const res = await request(app).post('/updateHistoryDiaria').send(mockedHistory);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /getHistoryDetallado -> should return the detail history', async () => {
    const res = await request(app)
    .get('/getHistoryDetallado')
    .query({ usuario: 'testuser' });

    expect(res.statusCode).toEqual(200);
  });

  it('GET /getHistoryDetallado -> should return an error if no user is provided', async () => {
    const res = await request(app).get('/getHistoryDetallado');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /getHistoryTotal -> should return the total history', async () => {
    const res = await request(app)
    .get('/getHistoryTotal')
    .query({ usuario: 'testuser' });

    expect(res.statusCode).toEqual(200);
  });

  it('GET /getHistoryTotal -> should return an error if no user is provided', async () => {
    const res = await request(app).get('/getHistoryTotal');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /getRankingDiarias -> should return the ranking', async () => {
    const res = await request(app).get('/getRankingDiarias');

    expect(res.statusCode).toEqual(200);
  });
});