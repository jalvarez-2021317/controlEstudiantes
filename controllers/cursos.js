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

     try {
    const { nombre, descripcion,estudiantes } = req.body;
    const profesor = req.user._id; // El profesor que está creando el curso

    const curso = await Curso.create({ nombre,descripcion, profesor, estudiantes });
    res.status(201).json({ curso });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al crear el curso' });
  }


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