// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')

const validator = require('validator');

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

// Funcion que comprueba si las contraseñas introducidas por el usuario son iguales
function validatePasswords(req) {
  if (req.body.password !== req.body.passwordConfirm) {
    throw new Error('Las contraseñas no coinciden');
  }
}

// funcion que comprueba si la contraseña tiene el formato adecuado
//si hay errores, los añade para despues enseñarlos al usuario
function validateFormatPassword(password) {
  const errors = [];

  //la contraseña tiene que tener al menos 12 caracteres
  if (password.length < 12) {
    errors.push('La contraseña tiene que tener al menos 12 caracteres');
  }

  //la contraseña tiene que tener al menos una letra mayúscula
  if(!password.match(/[A-Z]/)){
    errors.push('La contraseña tiene que tener al menos una letra mayúscula');
  }

  //la contraseña tiene que tener al menos una letra minúscula
  if(!password.match(/[a-z]/)){
    errors.push('La contraseña tiene que tener al menos una letra minúscula');
  }

  //la contraseña tiene que tener al menos un número
  if(!password.match(/[0-9]/)){
    errors.push('La contraseña tiene que tener al menos un número');
  }

  //la contraseña tiene que tener al menos un carácter especial
  if(!password.match(/[^a-zA-Z0-9]/)){
    errors.push('La contraseña tiene que tener al menos un carácter especial');
  }

  return errors;
}

// funcion que comprueba si el email introducido por el usuario es valido
//si es valido comprueba si ya existe en la base de datos
async function validateEmail(req) {
  if(!validator.isEmail(req.body.email)){
    throw new Error('El email es invalido');
  }
  //comprobamos si existe el email en la base de datos
  else{
    const user = await User.findOne({email: req.body.email});
    if(user !== null){
      throw new Error('El email ya existe en la base de datos')
    }
  }
}

//si es valido comprueba si ya existe en la base de datos
async function checkUsername(req) {
  const user = await User.findOne({username: req.body.username});
  if(user !== null){
    throw new Error('El username ya existe en la base de datos')
  }
}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['email', 'username', 'password', 'passwordConfirm']);

        // comprobar si el email introducido por el usuario es valido
        await validateEmail(req);

        // comprobar si el nombre de usuario introducido por el usuario ya existe en la base de datos
        await checkUsername(req);

        // comprobar si las contraseñas introducidas por el usuario son iguales
        validatePasswords(req);

        // comprobamos si las contraseñas tienen el formato adecuado
        const passwordErrors = validateFormatPassword(req.body.password);
        if (passwordErrors.length > 0) {
          throw new Error(passwordErrors.join('; \n'));
        }

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server