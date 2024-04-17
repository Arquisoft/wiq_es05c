import GameMode from './GameMode';

describe('GameMode', () => {
  let gameMode;

  beforeEach(() => {
    gameMode = new GameMode();
  });

  test('throws error when fetchQuestions is called', async () => {
    await expect(gameMode.fetchQuestions()).rejects.toThrow("Method 'fetchQuestions' must be implemented.");
  });

  test('throws error when startGame is called', async () => {
    await expect(gameMode.startGame()).rejects.toThrow("Method 'startGame' must be implemented.");
  });

  test('throws error when endGame is called', async () => {
    await expect(gameMode.endGame()).rejects.toThrow("Method 'endGame' must be implemented.");
  });

  test('throws error when sendHistory is called', async () => {
    await expect(gameMode.sendHistory()).rejects.toThrow("Method 'sendHistory' must be implemented.");
  });

  test('throws error when nextQuestion is called', () => {
    expect(() => gameMode.nextQuestion()).toThrow("Method 'nextQuestion' must be implemented.");
  });

  test('throws error when getCurrentQuestion is called', () => {
    expect(() => gameMode.getCurrentQuestion()).toThrow("Method 'nextQuestion' must be implemented.");
  });
});