const axios = require('axios');
const app = require('./question-service'); 
const request = require('supertest');

jest.mock('axios');

describe('GET /questions', () => {

    it('should return 200 and a list of questions', async () => {
        const questions = [
            { id: 1, question: 'What is your name?' },
            { id: 2, question: 'What is your age?' }
        ];

        axios.get.mockResolvedValue({ data: questions });

        await request(app)
            .get('/questions')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(questions);
    });

    it('should return 500 if there is an error', async () => {
        axios.get.mockRejectedValue(new Error('Internal Server Error'));

        await request(app)
            .get('/questions')
            .expect(500);
    });
});
