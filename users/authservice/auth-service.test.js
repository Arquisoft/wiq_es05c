const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./auth-model');

let mongoServer;
let app;

//test user
const user = {
  username: 'testuser',
  password: 'testpassword',
};

async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./auth-service'); 
  //Load database with initial conditions
  await addUser(user);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('Should perform a login operation /login', async () => {
    const userFail = {
      username: 'testuser',
      password: 'testpass',
    };
    const response = await request(app).post('/login').send(userFail);
    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Credenciales erroneas");
  });

  it('Should not perform a login operation /login', async () => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({
      user: user.username,
      password: hashedPassword,
    }); 

    const response = await request(app).post('/login').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Missing required field: username");
  });
  
  test('should respond and error if the username is not the same', async () => {
  
    // Make a POST request to /updateUserDaily
    const response = await request(app)
      .post('/updateUserDaily')
      .send({ user: 'username', fecha: '2022-01-01' });
  
      expect(response.status).toBe(400);
  });

  
test('should respond with user when fecha is valid and user equals username in localStorage', async () => {
  // Mock localStorage.getItem
  const localStorageMock = {
    getItem: jest.fn().mockReturnValue('username'),
  };
  global.localStorage = localStorageMock;

  // Make a POST request to /updateUserDaily
  const response = await request(app)
    .post('/updateUserDaily')
    .send({ user: 'username', fecha: '2022-01-01' });

  // Assert that the response includes the expected user
  expect(response.status).toBe(200);
  });
});
