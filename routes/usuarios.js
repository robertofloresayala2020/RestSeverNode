
const { Router } = require('express');
const {check}= require('express-validator');
const{validarCampos,validarJWT, esAdminRole, tieneRoles}= require('../middlewares/index');
const {IsValidRol,EmailExist, existeUsuarioPorId} = require('../helpers/db-validator');



/*Destrucuturamos*/
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet ); // Manda la referencia  usuariosGet de que controlador ocupara

//id es un parametro de segmento
router.put('/:id',[
              check('id','No es un ID válido').isMongoId(),
              check('id').custom(existeUsuarioPorId),
              check('rol').custom((rol)=>IsValidRol(rol)),  // Es un callback por eso le mandamos todo el argumento rol
              validarCampos]
            , usuariosPut ); // Manda la referencia usuariosPut de que controlador ocupara

router.post('/', [
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('password','El password debe ser de 6 letras').isLength({min:6}),
            check('correo','El correo no es válido').isEmail(),
            //check('rol','No es un rol válid').isIn(['ADMIN_ROLE','USER_ROLE']),
            check('rol').custom((rol)=>IsValidRol(rol)),  // Es un callback por eso le mandamos todo el argumento rol
            check('correo').custom((correo)=>EmailExist(correo)), 

            validarCampos ],
            usuariosPost ); // Manda la referencia usuariosPot de que controlador ocupara

router.delete('/:id',[
            
            validarJWT,
            esAdminRole,      
            tieneRoles('ADMIN_ROLE','SUPER_ROLE') ,   
            check('id','No es un ID válido').isMongoId(),
            check('id').custom(existeUsuarioPorId),    
            validarCampos]        
            ,usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;