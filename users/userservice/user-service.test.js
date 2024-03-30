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
});


//pruebas para el formato de las contraseñas

describe('User Service', () => {
  it('should send an error because the password need to have 12 characters long minimum on POST /adduser', async () => {
    const newUser = {
      email: 'test2@email.com',
      username: 'test2user',
      password: 'Test_1',
      passwordConfirm: 'Test_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La contraseña tiene que tener al menos 12 caracteres');
  });
});

describe('User Service', () => {
  it('should send an error because the password need to have a capital letter on POST /adduser', async () => {
    const newUser = {
      email: 'test3@email.com',
      username: 'test3user',
      password: 'testpassword_1',
      passwordConfirm: 'testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La contraseña tiene que tener al menos una letra mayúscula');
  });
});

describe('User Service', () => {
  it('should send an error because the password need to have a lowercase letter on POST /adduser', async () => {
    const newUser = {
      email: 'test4@email.com',
      username: 'test4user',
      password: 'TESTPASSWORD_1',
      passwordConfirm: 'TESTPASSWORD_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La contraseña tiene que tener al menos una letra minúscula');
  });
});

describe('User Service', () => {
  it('should send an error because the password need to have a number on POST /adduser', async () => {
    const newUser = {
      email: 'test5@email.com',
      username: 'test5user',
      password: 'Testpassword_',
      passwordConfirm: 'Testpassword_',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La contraseña tiene que tener al menos un número');
  });
});

describe('User Service', () => {
  it('should send an error because the password need to have a special character on POST /adduser', async () => {
    const newUser = {
      email: 'test6@email.com',
      username: 'test6user',
      password: 'Testpassword1',
      passwordConfirm: 'Testpassword1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('La contraseña tiene que tener al menos un carácter especial');
  });
});


//pruebas para comprobar el formato del email

describe('User Service', () => {
  it('should send an error because the email is not valid on POST /adduser', async () => {
    const newUser = {
      email: 'testemail.com',
      username: 'test7user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El email es invalido');
  });
});

describe('User Service', () => {
  it('should send an error because the email is not valid on POST /adduser', async () => {
    const newUser = {
      email: 'test@email',
      username: 'test8user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El email es invalido');
  });
});


//pruebas para comprobar si el email o el username ya existe en la bd

describe('User Service', () => {
  it('should send an error because the email already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test@email.com',
      username: 'test9user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El email ya existe en la base de datos');
  });
});

describe('User Service', () => {
  it('should send an error because the username already exist in the database on POST /adduser', async () => {
    const newUser = {
      email: 'test10@email.com',
      username: 'testuser',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_1',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('El username ya existe en la base de datos');
  });
});


//pruebas para comprobar si las contraseñas son iguales
describe('User Service', () => {
  it('should send an error because the passwords are not equals on POST /adduser', async () => {
    const newUser = {
      email: 'test11@email.com',
      username: 'test11user',
      password: 'Testpassword_1',
      passwordConfirm: 'Testpassword_2',
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Las contraseñas no coinciden');
  });
});