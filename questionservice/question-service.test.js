const request = require('supertest');
const axios = require('axios');
const app = require('./question-service'); 

jest.mock('axios');
const mockedAxios = axios;

afterAll(async () => {
    app.close();
  });

describe('GET /getQuestion', () => {
    it('should return a question when the request is valid', async () => {
       
    });

    it('should return an error when the request is invalid', async () => {
        
    });
});
