
const { Router } = require('express');

/*Destrucuturamos*/
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet ); // Manda la referencia  usuariosGet de que controlador ocupara

//id es un parametro de segmento
router.put('/:id', usuariosPut ); // Manda la referencia usuariosPut de que controlador ocupara

router.post('/', usuariosPost ); // Manda la referencia usuariosPot de que controlador ocupara

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;