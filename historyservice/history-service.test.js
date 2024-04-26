const request = require('supertest');
const axios = require('axios');
const app = require('./history-service');

jest.mock('axios');

describe('GET /getHistoryDetallado', () => {

    // Mock responses from external services
  it('should return an error if no user is provided', async () => {
    const res = await request(app).get('/getHistoryDetallado');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /getHistoryTotal', () => {
  it('should return an error if no user is provided', async () => {
    const res = await request(app).get('/getHistoryTotal');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

afterAll(() => {
  app.close();
});