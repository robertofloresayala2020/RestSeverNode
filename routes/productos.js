
const { Router } = require('express');
const {check}= require('express-validator');
const { creaProducto,
        obtenerProducto, 
        obtenerProductos,
        actualizaProducto,
        borrarProducto } = require('../controllers/Productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {existeProducto,existeCategoria} = require('../helpers/db-validator');


//const { validarJWT} = require ('../middlewares');

const router = Router();
 
router.get('/',obtenerProductos);

router.get('/:id',
            [
             check('id','No es un id de mongo válido').isMongoId(),
             check('id').custom(existeProducto),
             validarCampos

            ]
    ,obtenerProducto);

router.post('/',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('categoria','No es un id de Mongo').isMongoId(),
        check('categoria').custom(existeCategoria),
        validarCampos
        ],creaProducto);

router.put('/:id',[
        validarJWT,
       // check('categoria','No es in id de Mongo').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos],
        actualizaProducto
        );

router.delete('/:id',
        [validarJWT,
         esAdminRole,
         check('id','No es un id de mongo válido').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos]
,borrarProducto);


module.exports= router;


