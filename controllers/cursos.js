//Importacion
const { response, request } = require('express');

//Modelos
const Curso = require('../models/cursos');


const getCurso = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
    ]);

    res.json({
        msg: 'GET API de Cursos',
        listaCursos
    });

}

const postCurso = async (req = request, res = response) => {

    const { nombre, maestro, descripcion } = req.body;
    const cursoDB = new Usuario({ nombre, maestro, descripcion });

    //Guardar en Base de datos
    await cursoDB.save();

    res.status(201).json({
        msg: 'POST API de Estudiante',
        cursoDB
    });

}

const putCurso = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id,  estado, ...resto } = req.body;

    //editar y guardar
    const cursoEdit = await Curso.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Estudiante',
        cursoEdit
    });

}


const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const cursoDel = await Curso.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de usuario',
        cursoDel
    });

}



module.exports = {
    getCurso,
    postCurso,
    putCurso,
    deleteCurso
}