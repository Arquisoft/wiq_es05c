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

  const addUserTest = async (userData, expectedStatus, expectedError) => {
    const response = await request(app).post('/adduser').send(userData);
    expect(response.status).toBe(expectedStatus);
    expect(response.body.error).toBe(expectedError);
  };

  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      username: 'testuser',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_1',
    };

    await addUserTest(newUser, 200, undefined);
  });

  it('should not add a new user on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      user: 'testuser',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_1',
    };

    await addUserTest(newUser, 400, 'Missing required field: username');
  });

//pruebas para el formato de las contraseñas

  it('should send an error because the credential is incorrect on POST /adduser', async () => {
    const newUser = {
      email: 'test2@email.com',
      username: 'test2user',
      credential: 'test',
      credentialConfirm: 'test',
    };

    const errors = 
      "La contraseña tiene que tener al menos 12 caracteres; \n" +
      "La contraseña tiene que tener al menos una letra mayúscula; \n" +
      "La contraseña tiene que tener al menos un número; \n" +
      "La contraseña tiene que tener al menos un carácter especial"
    ;

    await addUserTest(newUser, 400, errors);
  });

  it('should send an error because the credential is incorrect on POST /adduser', async () => {
    const newUser = {
      email: 'test2.1@email.com',
      username: 'test2.1user',
      credential: 'TEST',
      credentialConfirm: 'TEST',
    };

    const errors = 
      "La contraseña tiene que tener al menos 12 caracteres; \n" +
      "La contraseña tiene que tener al menos una letra minúscula; \n" +
      "La contraseña tiene que tener al menos un número; \n" +
      "La contraseña tiene que tener al menos un carácter especial"
    ;

    await addUserTest(newUser, 400, errors);
  });
  
//pruebas para comprobar el formato del email

  it('should send an error because the email is not valid on POST /adduser', async () => {
    const newUser = {
      email: 'testemail.com',
      username: 'test2user',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_1',
    };

    await addUserTest(newUser, 400, 'El email es invalido');
  });

//pruebas para comprobar si el email o el username ya existe en la bd

  it('should send an error because the email already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      username: 'test3user',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_1',
    };

    await addUserTest(newUser, 400, 'El email ya existe en la base de datos');
  });

  it('should send an error because the username already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test4@email.com',
      username: 'testuser',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_1',
    };

    await addUserTest(newUser, 400, 'El username ya existe en la base de datos');
  });


//pruebas para comprobar si las contraseñas son iguales

it('should send an error because the credentials are not equals on POST /adduser', async () => {
    const newUser = {
      email: 'test5@email.com',
      username: 'test5user',
      credential: 'Testcredential_1',
      credentialConfirm: 'Testcredential_2',
    };

    await addUserTest(newUser, 400, 'Las contraseñas no coinciden');
  });
  
});