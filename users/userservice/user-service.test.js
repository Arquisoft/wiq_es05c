const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      username: 'testuser',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'username', 'testuser');
  });

  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      user: 'testuser',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Missing required field: username");
  });

//pruebas para el formato de las contraseñas

  it('should send an error because the password is incorrect on POST /adduser', async () => {
    const newUser = {
      email: 'test2@email.com',
      username: 'test2user',
      password: 'test',
      passwordConfirm: 'test',
    };

    const errors = 
      "La contraseña tiene que tener al menos 12 caracteres; \n" +
      "La contraseña tiene que tener al menos una letra mayúscula; \n" +
      "La contraseña tiene que tener al menos un número; \n" +
      "La contraseña tiene que tener al menos un carácter especial"
    ;

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors);
  });

  it('should send an error because the password is incorrect on POST /adduser', async () => {
    const newUser = {
      email: 'test2.1@email.com',
      username: 'test2.1user',
      password: 'TEST',
      passwordConfirm: 'TEST',
    };

    const errors = 
      "La contraseña tiene que tener al menos 12 caracteres; \n" +
      "La contraseña tiene que tener al menos una letra minúscula; \n" +
      "La contraseña tiene que tener al menos un número; \n" +
      "La contraseña tiene que tener al menos un carácter especial"
    ;

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(errors);
  });
  
//pruebas para comprobar el formato del email

  it('should send an error because the email is not valid on POST /adduser', async () => {
    const newUser = {
      email: 'testemail.com',
      username: 'test2user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El email es invalido');
  });

//pruebas para comprobar si el email o el username ya existe en la bd

  it('should send an error because the email already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      username: 'test3user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El email ya existe en la base de datos');
  });

  it('should send an error because the username already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test4@email.com',
      username: 'testuser',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El username ya existe en la base de datos');
  });


//pruebas para comprobar si las contraseñas son iguales

it('should send an error because the passwords are not equals on POST /adduser', async () => {
    const newUser = {
      email: 'test5@email.com',
      username: 'test5user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_2',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Las contraseñas no coinciden');
  });
  
});