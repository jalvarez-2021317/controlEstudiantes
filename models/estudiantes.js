const { Schema, model } = require('mongoose');

const EstudianteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    rol: {
        type: String,
        default: 'ROL_ESTUDIANTE'
    },
    cursos: [
        { type: Schema.Types.ObjectId, ref: 'curso' 
    }],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Estudiante', EstudianteSchema)