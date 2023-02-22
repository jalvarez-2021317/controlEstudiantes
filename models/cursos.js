const { Schema, model } = require('mongoose');

const CursoSchema = new Schema({
    nombre: {
      type: String,
      required: true
    },
    descripcion: String,
    profesor: {
      type: Schema.Types.ObjectId,
      ref: 'maestro',
      required: true
    },
    estudiantes: [{
      type: Schema.Types.ObjectId,
      ref: 'estudiante'
    }]
  });

module.exports = model('Curso', CursoSchema)