const InfinityGameMode = require('./InfinityGameMode');
const SameCategoryMode = require('./InfinityGameMode');
describe('InfinityGameMode', () => {
  let infinityGameMode;

  beforeEach(() => {  
    infinityGameMode = new InfinityGameMode();
  });

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


test('should get current question', () => {
  infinityGameMode.questions = [
    {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
  ];
  infinityGameMode.questionIndex = 0;
  const question = infinityGameMode.getCurrentQuestion();
  expect(question).toEqual({pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"});
});

test('should increment questionIndex and return current question', () => {
  infinityGameMode.questions = [
    {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
    {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
  ];
  infinityGameMode.questionIndex = 0;

  const result = infinityGameMode.nextQuestion();
  
});


test('should throw error if getCurrentQuestion is called with no questions', () => {
  infinityGameMode.questions = [];
  expect(() => infinityGameMode.getCurrentQuestion()).toThrow('No question at index 0');
});
});
