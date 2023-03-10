//importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEstudiante, putEstudiante, deleteEstudiante, postEstudiante, postAgregarCuros } = require('../controllers/estudiantes');
const { emailExiste, esRoleValido, esCursoValido } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/mostrar', getEstudiante);

router.post('/agregar',
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    check('curso').custom(esCursoValido),
    validarCampos,
    postEstudiante);

router.post('/agregar/:id/cursos', postAgregarCuros)

router.put('/editar/:id',
    validarCampos
    , putEstudiante);

router.delete('/eliminar/:id',
    validarCampos
    , deleteEstudiante);



module.exports = router;