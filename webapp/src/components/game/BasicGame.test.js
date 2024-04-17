import BasicGame from './BasicGame';

describe('BasicGame', () => {
  let game;

  beforeEach(() => {
    game = new BasicGame();
    game.navigate = jest.fn();
    game.fetchQuestions = jest.fn().mockResolvedValue([
        {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
        {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
      ]);

      fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
      })); 
  });
  //mockear la alerta 
  jest.mock('sweetalert2', () => ({
    fire: jest.fn(() => Promise.resolve())
  }));
  afterEach(() => {
    fetchMock.mockRestore();
  });

  test('should return undefined if there are no questions', () => {
    const result = game.nextQuestion();
    expect(result).toBeUndefined();
  });

  test('should return the last question if questionIndex is 9', () => {
    game.questions = ['question1', 'question2', 'question3'];
    game.questionIndex = 9;
    const result = game.nextQuestion();
    expect(result).toBe('question3');
  });

  test('should increment questionIndex and return current question', () => {
    game.questions = [
      {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
      {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
      {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
    ];
    game.questionIndex = 0;
  
    const result = game.nextQuestion();
    expect(result).toStrictEqual({pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"});
    expect(game.questionIndex).toStrictEqual(1);
  });

  test('should throw error if getCurrentQuestion is called with no questions', () => {
    game.questions = [];
    expect(() => game.getCurrentQuestion()).toThrow('No question at index 0');
  });

  test('should increment correctas', () => {
    game.incrementCorrectas();
    expect(game.correctas).toBe(1);
  });

  test('should increment incorrectas', () => {
    game.incrementIncorrectas();
    expect(game.incorrectas).toBe(1);
  });

  test('should set tiempoTotal', () => {
    game.setTiempoTotal(100);
    expect(game.tiempoTotal).toBe(100);
  });

  test('should end the game', async () => {
    await game.endGame();
    expect(game.isGameEnded).toBe(true);
    expect(game.isGameEnded).toBe(true);
    expect(game.questionIndex).toBe(0);
  });

  test('should start the game', async () => {
    await game.startGame();
    expect(game.isLoading).toBe(false);
    expect(game.questionIndex).toBe(0);
  });

  test('should send history', async () => {
    localStorage.setItem('username', 'testUser');
    await game.sendHistory({ correctas: 5, incorrectas: 3, tiempoTotal: 100 });
    expect(fetch).toHaveBeenCalledWith(`${game.apiEndpoint}/updateHistory`, expect.anything());
  });

  test('should get current question', () => {
    game.questions = [
      {pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
      {pregunta:"¿Cual es la capital de Alemania?",correcta:"Berlin",respuestasIncorrecta1:"Paris",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"},
      {pregunta:"¿Cual es la capital de España?",correcta:"Madrid",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Paris",respuestasIncorrecta3:"Londres"}
    ];
    game.questionIndex = 0;
    const question = game.getCurrentQuestion();
    expect(question).toEqual({pregunta:"¿Cual es la capital de Francia?",correcta:"Paris",respuestasIncorrecta1:"Berlin",respuestasIncorrecta2:"Madrid",respuestasIncorrecta3:"Londres"});
  });

  test('should finish game', () => {
    game.finishGame();
    expect(game.isGameEnded).toBe(true);
  });

  test('should block component', () => {
    document.body.innerHTML = `<input id="dark-mode-switch" /><button id="change-language-button" />`;
    game.blockComponent(0, 'dark-mode-switch', true);
    game.blockComponent(1, 'change-language-button', true);
    expect(document.getElementById('dark-mode-switch').disabled).toBe(true);
    expect(document.getElementById('change-language-button').getAttribute('inGame')).toBe('true');
  });

});