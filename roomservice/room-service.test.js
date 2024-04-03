const io = require('socket.io-client');
const server = require('./room-service');
let socket;
let port =8005;
beforeEach((done) => {
  // Setup
  socket = io.connect('http://localhost:'+'8005', {
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
  done();
});

describe('room-service.js', () => {
  it('should create a room correctly', (done) => {
    socket.emit('createRoom', {  username:'username' });
    socket.on('roomCreated', (data) => {
      expect(data).toBeDefined();
      done();
    });
  });

  // Add more tests for other events
});