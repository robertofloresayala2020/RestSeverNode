
const { Router } = require('express');
const {check}= require('express-validator');


const router = Router();

const { login,googleSingIn } = require('../controllers/auth');
const {validarCampos} = require('../middlewares/valida-campos');

router.post('/login',
            [check('correo','El correo es obligatoriooo').isEmail(),
            check('password','La contraseña es obligatoriaaa').not().isEmpty(),
            validarCampos]
            ,   login ); // Manda la referencia  usuariosGet de que controlador ocupara


router.post('/google',
            [
            check('id_token','El id_token es necesario').not().isEmpty(),
            validarCampos]
            , googleSingIn   ); // Manda la referencia  usuariosGet de que controlador ocupara


            

module.exports = router;