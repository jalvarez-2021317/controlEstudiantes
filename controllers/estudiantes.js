//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Estudiante = require('../models/estudiantes');


const getEstudiante = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaEstudiantes = await Promise.all([
        Estudiante.countDocuments(query),
        Estudiante.find(query)
    ]);

    res.json({
        msg: 'GET API de Estudiantes',
        listaEstudiantes
    });

}

const postEstudiante = async (req = request, res = response) => {

    const { nombre, correo, password,rol,curso } = req.body;
    const estudianteDB = new Estudiante({ nombre, correo, password,rol,curso});

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    estudianteDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await estudianteDB.save();

    res.status(201).json({
        msg: 'POST API de Estudiante',
        estudianteDB
    });

}

const putEstudiante = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado,  ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const estudianteEditado = await Estudiante.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Estudiante',
        estudianteEditado
    });

}


const deleteEstudiante = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const estudianteEliminado = await Estudiante.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de Usuario',
        estudianteEliminado
    });

}



module.exports = {
    getEstudiante,
    postEstudiante,
    putEstudiante,
    deleteEstudiante
}