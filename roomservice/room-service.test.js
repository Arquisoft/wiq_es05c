const io = require('socket.io-client');
const server = require('./room-service');
const axios = require('axios');
let socket,socket2;
let port =8005;

jest.mock('axios');

// Antes de tu prueba
axios.get.mockResolvedValue({ data: 'mocked data' });

beforeEach((done) => {

  // Setup
  socket = io.connect('http://localhost:'+'8005', {
    'reconnection delay' : 0
    , 'reopen delay' : 0
    , 'force new connection' : true
  });
  socket2 = io.connect('http://localhost:'+'8005', {
    'reconnection delay' : 0
    , 'reopen delay' : 0
    , 'force new connection' : true
  });
  

  socket.on('connect', () => {
    done();
  });
});

afterEach((done) => {
  // Cleanup
  if(socket.connected) {
    socket.disconnect();
  }
  if(socket2.connected) {
    socket.disconnect();
  }
  done();
});

describe('room-service.js', () => {
 // Test para crear una sala
 it('should create a room correctly', (done) => {
  socket.emit('createRoom', {  username:'username' });
  socket.on('roomCreated', (data) => {
    expect(data).toBeDefined();
    done();
  });
});
// Test para unirte a una sala siendo otro usuario 
it('should join a room correctly', (done) => {
  socket.emit('createRoom', {  username:'usernamePrimero' });
  socket.on('roomCreated', (data) => {
    let roomId = data.toString(); // Convert the room ID to a string
    socket2.emit('joinRoom', { id: roomId, username: 'username0Segundo' });
    socket2.on('roomJoined', (data) => {
      expect(data).toBeDefined();
      done();
    });
  });
});

it('should show the users once the page is loaded', (done) => {
  socket.emit('createRoom', {  username:'usernamePrimero' });
  socket.on('roomCreated', (data) => {
    let roomId = data.toString(); // Convert the room ID to a string
    socket2.emit('joinRoom', { id: roomId, username: 'username0Segundo' });
    socket2.on('roomJoined', (data) => {
      socket2.emit('ready', { id: roomId });
      socket2.on('currentUsers', (data) => {
        expect(data).toBeDefined();
        done();
      });
    });
  });
});
  //caso de que la sala no exista 
  it('should not join a room that dont exist ', (done) => {
    let roomId= "1234Noexiste";
    socket2.emit('joinRoom', { id: roomId, username: 'username0Segundo' });
    socket2.on('roomErrorJoining', () => {
  
        done();
      });
  
    
  });


 //test start game 
 it('should start game', (done) => {
  // Mock axios.get to simulate getting questions
  axios.get.mockResolvedValue({ data: 'questions' });

  socket.emit('createRoom', {  username:'usernamePrimero' });
    socket.on('roomCreated', (data) => {
      let roomId = data.toString(); // Convert the room ID to a string
      socket2.emit('joinRoom', { id: roomId, username: 'username0Segundo' });
      socket2.on('roomJoined', (data) => {
        expect(data).toBeDefined();
        done();
      });

      // Start game
      socket.emit('startGame', { id: roomId });
      socket.on('gameStarted', (data) => {
      expect(data).toEqual('questions');
      done();
        });
    });
  });

  it('should end a  game', (done) => {
    // Mock axios.get to simulate getting questions
    axios.get.mockResolvedValue({ data: 'questions' });
  
    socket.emit('createRoom', {  username:'usernamePrimero' });
      socket.on('roomCreated', (data) => {
        let roomId = data.toString(); // Convert the room ID to a string
        socket2.emit('joinRoom', { id: roomId, username: 'username0Segundo' });
        socket2.on('roomJoined', (data) => {
          expect(data).toBeDefined();
          done();
        });
  
        // Start game
        socket.emit('startGame', { id: roomId });
        socket.on('gameStarted', (data) => {
        expect(data).toEqual('questions');
        done();
          });

        //End game 
        const ranking = { 'username1': 10, 'username2': 20 };

        socket.emit('endGame', { id: roomId, results: { user: 'username1', correctas: 5, incorrectas: 0, tiempoTotal: 60 } });
        socket2.emit('endGame', { id: roomId, results: { user: 'username2', correctas: 4, incorrectas: 1, tiempoTotal: 60 } });
        socket.on('gameEnded', (ranking) => {
          expect(ranking).toEqual(ranking);
          done();
        });

        
      });
    });
  



});