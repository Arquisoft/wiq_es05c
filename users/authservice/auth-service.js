const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model')

const ActualizarUser = require("./actualizarUsuario");
const actualizarUser = new ActualizarUser();

const app = express();
const port = 8002; 

// Middleware to parse JSON in request body
app.use(express.json());

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

function getFecha() {
  const fecha = new Date(); // Obtenemos la fecha actual
  // como nos da tambien la hora y no queremos eso, la eliminamos
  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();
  // Formateamos la fecha para que sea compatible con la base de datos
  const fechaSinHora = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
  return fechaSinHora;
}

function validarFormatoFecha(fecha) {
  //comprobar que la fecha no es vacia o null
  if (!fecha) {
    return false;
  }
  //comprobar que la fecha tiene el formato correcto
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(fecha);
}

// Route for user login
app.post('/login', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    // Find the user by username or email in the database
    const user = await User.findOne({ $or: [{ username: username }, { email: username }] });

    // Check if the user exists and verify the password
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      let ultimaDiaria;
      
      if(user.diaria === getFecha()){
        let expiryDate = new Date();
        expiryDate.setHours(24, 0, 0, 0);
        //si no hay ese token lo creamos
        ultimaDiaria = JSON.stringify({
          value: 'valor que quieras almacenar',
          expiry: expiryDate.getTime(),
        });
      }

      // Respond with the token and user information
      res.json({ token: token, username: username, createdAt: user.createdAt , lastDailyGame: ultimaDiaria});
    } else {
      res.status(401).json({ error: 'Credenciales erroneas' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

app.post('/updateUserDaily', async (req, res) => {
  try {
    console.log("Entra en el auth service del update")
    if(validarFormatoFecha(req.body.fecha) && user === localStorage.getItem('username')){
      let datos = {userData : user, fecha: fecha};
      //comprobamos si la fecha tiene el formato correcto

      var user = await actualizarUser.updateUserDaily(datos);
    }
    res.json({ user: user});
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
