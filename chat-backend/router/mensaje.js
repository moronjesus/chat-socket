const { Router }        = require('express');
const { obtenerChat }   = require('../controllers/mensaje');
const { validarJWT }    = require('../middleware/validar-jwt')


const router = Router();


router.get('/:de', validarJWT, obtenerChat );


module.exports = router