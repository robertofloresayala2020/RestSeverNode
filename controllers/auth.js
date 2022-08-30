const { response, request } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login= async (req,res)=>
{
 const {correo, password} = req.body;


    try
    {
        //Verifica si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario)
        { return  res.status(400).json({
                msg: 'Usuario/ Password no son correctos -correo'
        });
        }
        
        if(!usuario.estado)
        {
            return res.status(400).json(
                {
                msg:'Usuario deshabilitado'

                }
            );

        }

        //GENERAR el JWT
        const token = await generarJWT(usuario.id);

        res.json({

            usuario,
            token
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            msg:`Ocurrio un error ${error}`
        });

    }
    
}

module.exports={login}