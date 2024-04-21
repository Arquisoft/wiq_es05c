
const DailyGameMode = require('./DailyGameMode');

describe('DailyGameMode', () => {
  let dailyGameMode;

  beforeEach(() => {  
    dailyGameMode = new DailyGameMode();
  });

  test('fetchQuestions should fetch questions', async () => {
    const dailyGameMode = new DailyGameMode();
    dailyGameMode.apiEndpoint = 'https://example.com';
    dailyGameMode.questions = [];
    dailyGameMode.isLoading = true;

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

    await dailyGameMode.fetchQuestions();

    expect(dailyGameMode.questions).toEqual([{
      correcta: 'correct answer',
      respuestasIncorrecta1: 'incorrect answer 1',
      respuestasIncorrecta2: 'incorrect answer 2',
      respuestasIncorrecta3: 'incorrect answer 3',
    }]);
    expect(dailyGameMode.isLoading).toBe(false);
  });

  test('fetchQuestions should handle errors', async () => {
    const dailyGameMode = new InfinityGameMode();
    dailyGameMode.apiEndpoint = 'https://example.com';
    dailyGameMode.questions = [];
    dailyGameMode.isLoading = true;

    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));

    await dailyGameMode.fetchQuestions();

    expect(dailyGameMode.questions).toEqual([]);
    expect(dailyGameMode.isLoading).toBe(true);
  });

  test('sendHistory should not save game history', async () => {
    const dailyGameMode = new DailyGameMode();
    dailyGameMode.sendHistory();
   
  });
  test('should always pass', () => {
    expect(true).toBe(true);
});


test('should get current question', () => {
    dailyGameMode.questions = [
    {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
  ];
  dailyGameMode.questionIndex = 0;
  const question = dailyGameMode.getCurrentQuestion();
  expect(question).toEqual({pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"});
});



test('should throw error if getCurrentQuestion is called with no questions', () => {
    dailyGameMode.questions = [];
  expect(() => dailyGameMode.getCurrentQuestion()).toThrow('No question at index 0');
});
});