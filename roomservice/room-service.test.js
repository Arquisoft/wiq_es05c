const RoomQuestions = require('./RoomQuestions');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');

jest.mock('axios');

describe('RoomQuestions', () => {
    let roomQuestions;
    let io;
    let socket;

    beforeEach(() => {
      const server = http.createServer();
      server.listen();
      io = new Server(server);
      socket = { 
          emit: jest.fn().mockImplementation((event, message) => {
              console.log(`Event: ${event}, Message: ${message}`);
          }), 
          join: jest.fn(),
          of: jest.fn().mockReturnThis(),
          sockets: {
              values: jest.fn().mockReturnThis(),
              next: jest.fn().mockReturnThis(),
              value: jest.fn()
          }
      };
      roomQuestions = new RoomQuestions(io);
  });

    afterEach(() => {
        io.close();
    });

    test('should create room', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket);
        expect(roomQuestions.rooms.has(id)).toBe(true);
    });

    test('should join room', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket);
        await roomQuestions.joinRoom(id, 'anotherUser', socket);
        expect(roomQuestions.rooms.get(id)).toContain('anotherUser');
    });

    test('should start game if enough players', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket);
        await roomQuestions.joinRoom(id, 'anotherUser', socket);

        axios.get.mockResolvedValue({ data: 'questions' });

        await roomQuestions.startGame(id, socket);
        expect(socket.emit).toHaveBeenCalledWith('gameStarted', 'questions');
    });
    test('should not start game without enough players', async () => {
      const username = 'testUser';
      const id = await roomQuestions.createRoom(username, socket);
  
      // Try to start game with only one user
      await roomQuestions.startGame(id, socket);
  
      // Check that the game did not start
      expect(socket.emit).not.toHaveBeenCalledWith('gameStarted', expect.anything());
  });

    test('should end game and determine winner', async () => {
      const username = 'testUser';
      const anotherUser = 'anotherUser';
      const id = await roomQuestions.createRoom(username, socket);
      await roomQuestions.joinRoom(id, anotherUser, socket);
      await roomQuestions.joinRoom(id, username, socket);

      // Check that there are only two users in the room
      const roomUsers = roomQuestions.getRoomUsers(id);
      expect(roomUsers.length).toBe(2);

      // Start game for both users
      await roomQuestions.startGame(id, socket);

      // Check that the game started
      expect(socket.emit).toHaveBeenCalledWith('gameStarted', expect.anything());

      // End game for both users
      await roomQuestions.endGame(id, { user: username, correctas: 5, incorrectas: 0, tiempoTotal: 10 }, socket);
      await roomQuestions.endGame(id, { user: anotherUser, correctas: 1, incorrectas: 4, tiempoTotal: 20 }, socket);

      // Check that the game ended
      expect(socket.emit).toHaveBeenCalledWith('gameEnded', expect.any(String));
  });
});