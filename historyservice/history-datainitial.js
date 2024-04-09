const mongoose = require('mongoose');
const History = mongoose.model('historial');

// Datos de prueba
const datosDePrueba = [
  {
    user: 'usuario1',
    diariasAcertadas: 0,
    juegos: [
      {
        numeroJuego: 1,
        preguntasFalladas: 2,
        preguntasAcertadas: 8,
        tiempo: 120,
        fecha: new Date('2024-03-20')
      },
      {
        numeroJuego: 2,
        preguntasFalladas: 1,
        preguntasAcertadas: 9,
        tiempo: 150,
        fecha: new Date('2024-03-21')
      }
    ]
  },
  {
    user: 'usuario2',
    diariasAcertadas: 2,
    juegos: [
      {
        numeroJuego: 1,
        preguntasFalladas: 3,
        preguntasAcertadas: 7,
        tiempo: 130,
        fecha: new Date('2024-03-20')
      }
    ]
  }
];

// Verificar si los usuarios existen en la base de datos
const verificarUsuarios = async () => {
  try {
    const usuariosExistentes = await History.find({ user: { $in: datosDePrueba.map(data => data.user) } });
    const usuariosExistentesNombres = usuariosExistentes.map(user => user.user);

    // Filtrar datos de prueba para evitar usuarios existentes
    const datosSinUsuariosExistentes = datosDePrueba.filter(data => !usuariosExistentesNombres.includes(data.user));

    return datosSinUsuariosExistentes;
  } catch (error) {
    console.error('Error al verificar usuarios:', error);
    throw error;
  }
};

// Insertar datos de prueba para usuarios no existentes
const insertarDatosDePrueba = async () => {
  try {
    const datosSinUsuariosExistentes = await verificarUsuarios();

    if (datosSinUsuariosExistentes.length > 0) {
      await History.insertMany(datosSinUsuariosExistentes);
      console.log('Datos de prueba insertados correctamente.');
    } else {
      console.log('No se añadieron datos de prueba porque los usuarios ya existen en la base de datos.');
    }
  } catch (error) {
    console.error('Error al insertar datos de prueba:', error);
    throw error;
  }
};

// Llamar a la función para insertar datos de prueba
insertarDatosDePrueba();
