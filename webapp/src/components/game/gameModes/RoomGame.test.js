import RoomGame from './RoomGame';

describe('RoomGame', () => {
    let roomGame;
    let fetchMock;
    beforeEach(() => {
        const mockRoom = { 
          winner: jest.fn(),
          getQuestions: [
            { pregunta: "¿Cual es la capital de Francia?", correcta: "Paris", respuestasIncorrecta1: "Berlin", respuestasIncorrecta2: "Madrid", respuestasIncorrecta3: "Londres" },
            { pregunta: "¿Cual es la capital de Alemania?", correcta: "Berlin", respuestasIncorrecta1: "Paris", respuestasIncorrecta2: "Madrid", respuestasIncorrecta3: "Londres" },
            { pregunta: "¿Cual es la capital de España?", correcta: "Madrid", respuestasIncorrecta1: "Berlin", respuestasIncorrecta2: "Paris", respuestasIncorrecta3: "Londres" }
          ],
          endGame: jest.fn()
        }; 
        const mockNavigate = jest.fn();
      
        roomGame = new RoomGame(mockRoom, mockNavigate);
      
        fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Success' }),
        }));
      });
  
    afterEach(() => {
        if (fetchMock) {
          fetchMock.mockRestore();
        }
      });
  
    // Aquí van tus pruebas, adaptadas para RoomGame. Por ejemplo:
    test('should start the game', async () => {
      await roomGame.startGame();
      expect(roomGame.isLoading).toBe(false);
      expect(roomGame.questionIndex).toBe(0);
      expect(roomGame.questions.length).toBe(3);
    });

    test('should fetch questions', async () => {
        await roomGame.fetchQuestions();
        expect(roomGame.questions.length).toBe(3);
      });

    test('should send history', async () => {
        const history = await roomGame.sendHistory({ correctas: 5, incorrectas: 3, tiempoTotal: 100 });
        expect(history).toBeUndefined();
      });

  test('should end the game', async () => {
    await roomGame.endGame();
    expect(roomGame.isGameEnded).toBe(true);
    expect(roomGame.room.endGame).toHaveBeenCalledWith({
      user: localStorage.getItem('username'),
      correctas: roomGame.correctas,
      incorrectas: roomGame.incorrectas,
      tiempoTotal: roomGame.tiempoTotal,
    });
    // Add more assertions for the Swal.fire function
  });

  test('should finish the game', () => {
    roomGame.finishGame();
    expect(roomGame.isGameEnded).toBe(true);
    expect(roomGame.room.endGame).toHaveBeenCalledWith({
      user: localStorage.getItem('username'),
      correctas: roomGame.correctas,
      incorrectas: roomGame.incorrectas,
      tiempoTotal: roomGame.tiempoTotal,
    });
    // Add more assertions for the Swal.fire function
  });
});