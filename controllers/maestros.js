//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Maestro = require('../models/maestros');


const getMaestro = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaMaestros = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
    ]);

    res.json({
        msg: 'GET API de Maestros',
        listaMaestros
    });

}

const postMaestro = async (req = request, res = response) => {

    const { nombre,apellido,dpi, correo, password,curso } = req.body;
    const maestroDB = new Usuario({ nombre, apellido, dpi ,correo, password, curso});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    maestroDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await maestroDB.save();

    res.status(201).json({
        msg: 'POST API de Estudiante',
        maestroDB
    });

}

const putMaestro= async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id,dpi, rol, estado,  ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const maestroEdit = await Maestro.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Estudiante',
        maestroEdit
    });

}


const deleteMaestro = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const maestroDel = await Maestro.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuario',
        maestroDel
    });

}



module.exports = {
    getMaestro,
    postMaestro,
    putMaestro,
    deleteMaestro
}