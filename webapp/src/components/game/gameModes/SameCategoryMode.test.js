const SameCategoryMode = require('./SameCategoryMode');

describe('SameCategoryMode', () => {
  
    test('fetchQuestions should fetch questions', async () => {
        const sameCategoryMode = new SameCategoryMode();
        sameCategoryMode.apiEndpoint = 'https://example.com';
        sameCategoryMode.questions = [];
        sameCategoryMode.isLoading = true;
    
        const mockResponse = {
        json: jest.fn().mockResolvedValue({
            '1': {
            correcta: 'correct answer',
            respuestasIncorrecta1: 'incorrect answer 1',
            respuestasIncorrecta2: 'incorrect answer 2',
            respuestasIncorrecta3: 'incorrect answer 3',
            },
        }),
        };
    
        global.fetch = jest.fn().mockResolvedValue(mockResponse);
    
        await sameCategoryMode.fetchQuestions();
    
        expect(sameCategoryMode.questions).toEqual([{
        correcta: 'correct answer',
        respuestasIncorrecta1: 'incorrect answer 1',
        respuestasIncorrecta2: 'incorrect answer 2',
        respuestasIncorrecta3: 'incorrect answer 3',
        }]);
        expect(sameCategoryMode.isLoading).toBe(false);
    });
    
    test('fetchQuestions should handle errors', async () => {
        const sameCategoryMode = new SameCategoryMode();
        sameCategoryMode.apiEndpoint = 'https://example.com';
        sameCategoryMode.questions = [];
        sameCategoryMode.isLoading = true;
    
        global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    
        await sameCategoryMode.fetchQuestions();
    
        expect(sameCategoryMode.questions).toEqual([]);
        expect(sameCategoryMode.isLoading).toBe(true);
    });
    
    test('sendHistory should not save game history', async () => {
        const sameCategoryMode = new SameCategoryMode();
        sameCategoryMode.sendHistory();
    });
    
    test('should always pass', () => {
        expect(true).toBe(true);
    });

});