const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Estudiante = require('../models/estudiantes');
const { generarJWT } = require('../helpers/generar-jwt');
const Maestro = require('../models/maestros');

const login = async( req = request, res = response ) => {

  const { email, password } = req.body;
  let user;

  // Verificar si el usuario es un estudiante
  user = await Estudiante.findOne({ email });
  if (user) {
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const match = await bcryptjs.compare(password, user.password);
    if (match) {
      // Generar el token de autenticación
     
      const token = await generarJWT( Estudiante.id );
      // Devolver el token en la respuesta
      res.send({ token });
      return;
    }
  }

  // Verificar si el usuario es un maestro
  user = await Maestro.findOne({ email });
  if (user) {
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const match = await bcryptjs.compare(password, user.password);
    if (match) {
      // Generar el token de autenticación
      const token = await generarJWT( maestro.id );
      // Devolver el token en la respuesta
      res.send({ token });
      return;
    }
  }

  // Si no se encontró un usuario con las credenciales ingresadas, devolver un error
  res.status(401).send({ message: 'Credenciales inválidas' });
}


module.exports = {
    login
}
