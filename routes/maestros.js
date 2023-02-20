//importaciones
const { Router } = require('express');
const { getMaestro, postMaestro, putMaestro, deleteMaestro } = require('../controllers/maestros');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.get('/mostrar', getMaestro);

router.post('/agregar',
    validarCampos,
    postMaestro);

router.put('/editar/:id', [
    validarCampos

], putMaestro);

router.delete('/eliminar/:id',
    validarCampos
    , deleteMaestro);



module.exports = router;