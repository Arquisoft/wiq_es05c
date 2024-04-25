const mongoose = require('mongoose');

const User = mongoose.model('User');

class ActualizarUsuario{

    async updateUserDaily(datos){ 
        return await User.findOneAndUpdate(
            { username: datos.user, $or: [{ diaria: null }, { diaria: { $exists: true } }] }, 
            { $set: { diaria: datos.fecha } }, // Establecer el valor de 'diaria' a la fecha proporcionada
            { new: true, upsert: true, strict: false } // Para devolver el documento actualizado y permitir campos no definidos en el esquema
        );
    }
}

module.exports = ActualizarUsuario;