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
});
