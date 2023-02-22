const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Estudiante = require('../models/estudiantes');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    //Validar si el token se envia en los headers
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const decoded = jwt.verify(token, SECRET_OR_PRIVATE_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error(err);
        res.status(403).send({ message: 'Token inválido' });
    }

}


module.exports = {
    validarJWT
}