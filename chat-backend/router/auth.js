const { Router }                          = require('express');
const { check }                           = require('express-validator');
const { createUser, login, renewToken }   = require('../controllers/auth');
const { validarCampos }                   = require('../middleware/validar-campos');
const { validarJWT }                      = require('../middleware/validar-jwt');

const router = Router();


//Registro de usuario
router.post('/register',[
    check('name', ' name no es valido').not().isEmpty(),
    check('password',' el password no es valido').not().isEmpty(),
    check('email', 'el email no es valido').isEmail(),
    validarCampos,
], createUser );


//Login
router.post('/login',[
  check('email', 'email no es valido ').isEmail(),
  check('password', 'password no es valido').not().isEmpty(),
  validarCampos
], login );


//Validar Token
router.get('/renew', validarJWT, renewToken );

module.exports = router

