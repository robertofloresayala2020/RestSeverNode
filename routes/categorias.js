
const { Router } = require('express');
const {check}= require('express-validator');
const { creaCategoria,
        obtenerCategoria, 
        obtenerCategorias,
        actualizaCategoria,
        borrarCategoria } = require('../controllers/categorias');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const {existeCategoria} = require('../helpers/db-validator');


//const { validarJWT} = require ('../middlewares');

const router = Router();
 
router.get('/',obtenerCategorias);

router.get('/:id',
            [
             check('id','No es un id de mongo válido').isMongoId(),
             check('id').custom(existeCategoria),
             validarCampos

            ]
    ,obtenerCategoria);

router.post('/',[
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
        ],creaCategoria);

router.put('/:id',[
        validarJWT,
        check('nombre','El nombre es obligatorio ').not().isEmpty(),
        check('id').custom(existeCategoria),
        validarCampos],
        actualizaCategoria
        );

router.delete('/:id',
        [validarJWT,
        esAdminRole,
         check('id').custom(existeCategoria),
        validarCampos]
,borrarCategoria);


module.exports= router;

