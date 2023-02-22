const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Estudiante = require('../models/estudiantes');
const Cursos = require('../models/cursos');
const { default: mongoose } = require('mongoose');


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

    const { nombre, apellido, correo, password,rol,curso } = req.body;
    const estudianteDB = new Estudiante({ nombre,apellido, correo, password,rol,curso});

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

const postAgregarCuros = async (req = request, res = response) => {
    const estudianteId = new mongoose.Types.ObjectId(req.params.id);
const cursos = req.body.cursos;

// Buscar al alumno por ID y verificar que existe
Estudiante.findById({ _id: estudianteId }, (err, estudiante) => {
  if (err) {
    console.error(err);
    res.status(500).send({ message: 'Error interno del servidor' });
    return;
  }
  if (!estudiante) {
    res.status(404).send({ message: 'Alumno no encontrado' });
    return;
  }
  
  // Verificar que no se asignen cursos duplicados
  for (let i = 0; i < cursos.length; i++) {
    if (estudiante.cursos.includes(cursos[i])) {
      res.status(400).send({ message: `El curso ${cursos[i]} ya está asignado al alumno` });
      return;
    }
  }

  // Verificar que el número máximo de cursos no se haya alcanzado
  if (estudiante.cursos.length + cursos.length > 3) {
    res.status(400).send({ message: 'El número máximo de cursos asignados es 3' });
    return;
  }

  // Agregar los cursos al array de cursos del alumno
  estudiante.cursos.push(...cursos);

  // Guardar el alumno actualizado en la base de datos
  estudiante.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error interno del servidor' });
      return;
    }
    res.send({ message: 'Cursos agregados correctamente' });
  });
});

     

  }


const putEstudiante = async (req = request, res = response) => {
    
    const { id } = req.params;

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
    postAgregarCuros,
    putEstudiante,
    deleteEstudiante
}