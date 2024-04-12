const RoomQuestions = require('./RoomQuestions');
const { Server } = require('socket.io');
const http = require('http');
const axios = require('axios');

jest.mock('axios');

describe('RoomQuestions', () => {
    let roomQuestions;
    let io;
    let socket1;
    let socket2;

    beforeEach(() => {
      const server = http.createServer();
      server.listen();
      io = new Server(server);
      socket1 = { 
          emit: jest.fn().mockImplementation((event, message) => {
              console.log(`Event: ${event}, Message: ${message}`);
          }), 
          join: jest.fn(),
          of: jest.fn().mockReturnThis(),
          sockets: {
              values: jest.fn().mockReturnThis(),
              next: jest.fn().mockReturnThis(),
              value: jest.fn()
          },
             //la funcion to simula que lo mandas al resto de jugadores 
        //en la practica lo manda a la sala de socket.io 
        to: jest.fn(() => ({
            emit: (event, message) => socket2.emit(event, message)
          }))
      };
      socket2 = { 
        emit: jest.fn().mockImplementation((event, message) => {
            console.log(`Event: ${event}, Message: ${message}`);
        }), 
        join: jest.fn(),
        of: jest.fn().mockReturnThis(),
        sockets: {
            values: jest.fn().mockReturnThis(),
            next: jest.fn().mockReturnThis(),
            value: jest.fn()
        },
        //la funcion to simula que lo mandas al resto de jugadores 
        //en la practica lo manda a la sala de socket.io 
        to: jest.fn(() => ({
            emit: (event, message) => socket1.emit(event, message)
          }))
    };
      roomQuestions = new RoomQuestions(io);
  });

    afterEach(() => {
        io.close();
    });

    test('should create room', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket1);
        expect(roomQuestions.rooms.has(id)).toBe(true);
    });

    test('should join room', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket1);
        await roomQuestions.joinRoom(id, 'anotherUser', socket2);
        expect(roomQuestions.rooms.get(id)).toContain('anotherUser');
    });

    test('should start game if enough players', async () => {
        const username = 'testUser';
        const id = await roomQuestions.createRoom(username, socket1);
        await roomQuestions.joinRoom(id, 'anotherUser', socket2);

        axios.get.mockResolvedValue({ data: 'questions' });

        await roomQuestions.startGame(id, null,socket1);
        expect(socket1.emit).toHaveBeenCalledWith('gameStarted', 'questions');
    });

    test('should not start game without enough players', async () => {
      const username = 'testUser';
      const id = await roomQuestions.createRoom(username, socket1);
  
      // Try to start game with only one user
      await roomQuestions.startGame(id, null,socket1);
  
      // Check that the game did not start
      expect(socket1.emit).not.toHaveBeenCalledWith('gameStarted', expect.anything());
  });

    test('should end game and determine winner', async () => {
      const username = 'testUser';
      const anotherUser = 'anotherUser';
      const id = await roomQuestions.createRoom(username, socket1);
      await roomQuestions.joinRoom(id, anotherUser, socket2);
      await roomQuestions.joinRoom(id, username, socket1);

      // Check that there are only two users in the room
      const roomUsers = roomQuestions.getRoomUsers(id);
      expect(roomUsers.length).toBe(2);

      // Start game for both users
      await roomQuestions.startGame(id,null ,socket1);

      // Check that the game started
      expect(socket1.emit).toHaveBeenCalledWith('gameStarted', expect.anything());

     // End game for first user
        await roomQuestions.endGame(id, { user: username, correctas: 5, incorrectas: 0, tiempoTotal: 10 }, socket1);

        // End game for second user
        await roomQuestions.endGame(id, { user: anotherUser, correctas: 1, incorrectas: 4, tiempoTotal: 20 }, socket2);

        // Check that the user 2 recived the game ended event
        expect(socket2.emit).toHaveBeenCalledWith('gameEnded',  [{"correctas": 5, "tiempoTotal": 10, "username": "testUser"}, {"correctas": 1, "tiempoTotal": 20, "username": "anotherUser"}]);
        // Check that the user 1 recived the game ended event
        expect(socket1.emit).toHaveBeenCalledWith('gameEnded', [{"correctas": 5, "tiempoTotal": 10, "username": "testUser"}, {"correctas": 1, "tiempoTotal": 20, "username": "anotherUser"}]);

  });
});