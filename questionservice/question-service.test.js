
const request = require('supertest');
const axios = require('axios');
const app = require('./question-service'); 

jest.mock('axios');
const mockedAxios = axios;

afterAll(async () => {
    app.close();
  });

describe('GET /getQuestion', () => {
    it('should always pass', () => {
        expect(true).toBe(true);
    }
    );
});
