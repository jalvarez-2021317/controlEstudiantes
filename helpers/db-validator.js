const Role = require('../models/role');
const Curso = require('../models/cursos')
const Maestro = require('../models/maestros');
const Estudiante = require('../models/estudiantes');

//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Estudiante.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}


const esCursoValido = async( curso = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeCursoDB = await Curso.findOne( { curso } );
    if ( !existeCursoDB ) {
        throw new Error(`El rol ${ curso }, no existe en la DB `);
    }
}

// const existeUsuarioPorId = async( id ) => {

//     //Verificar si existe el ID
//     const existIdOfUser = await Usuario.findById( id );
//     if ( !existIdOfUser ) {
//         throw new Error(`El id: ${id} no existe en la DB`);
//     }

// }


module.exports = {
    emailExiste,
    esRoleValido,
    esCursoValido,
    //existeUsuarioPorId
}