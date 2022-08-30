

const validarCampos  = require('../middlewares/valida-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');


//Operador spread
module.exports=
{
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,

}