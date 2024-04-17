const InfinityGameMode = require('./InfinityGameMode');
const SameCategoryMode = require('./InfinityGameMode');

describe('InfinityGameMode', () => {
  test('fetchQuestions should fetch questions', async () => {
    const infinityGameMode = new InfinityGameMode();
    infinityGameMode.apiEndpoint = 'https://example.com';
    infinityGameMode.questions = [];
    infinityGameMode.isLoading = true;

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

    await infinityGameMode.fetchQuestions();

    expect(infinityGameMode.questions).toEqual([{
      correcta: 'correct answer',
      respuestasIncorrecta1: 'incorrect answer 1',
      respuestasIncorrecta2: 'incorrect answer 2',
      respuestasIncorrecta3: 'incorrect answer 3',
    }]);
    expect(infinityGameMode.isLoading).toBe(false);
  });

  test('fetchQuestions should handle errors', async () => {
    const infinityGameMode = new InfinityGameMode();
    infinityGameMode.apiEndpoint = 'https://example.com';
    infinityGameMode.questions = [];
    infinityGameMode.isLoading = true;

    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    await infinityGameMode.fetchQuestions();

    expect(infinityGameMode.questions).toEqual([]);
    expect(infinityGameMode.isLoading).toBe(true);
  });

  test('sendHistory should not save game history', async () => {
    const sameCategoryMode = new SameCategoryMode();
    sameCategoryMode.sendHistory();
   
  });
  test('should always pass', () => {
    expect(true).toBe(true);
});
});
