import BasicGame from './BasicGame';

describe('BasicGame', () => {
  let game;

  beforeEach(() => {
    game = new BasicGame();
    game.navigate = jest.fn();
  });

  test('should return undefined if there are no questions', () => {
    const result = game.nextQuestion();
    expect(result).toBeUndefined();
    //game.fetchQuestions = jest.fn().mockResolvedValue(['question1', 'question2', 'question3']); // Mock the fetchQuestions function
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

  
});