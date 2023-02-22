const { Schema, model } = require('mongoose');

const MaestroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    dpi:{
        type: String,
        require:[true,'el dpi es necesario']
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
    
    },
    cursos: [
        { type: Schema.Types.ObjectId, ref: 'curso' 
    }],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model('Maestro', MaestroSchema)