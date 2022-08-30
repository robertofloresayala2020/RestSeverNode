const { response, request } = require('express');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async(req, res= response)=>
{

    const {id_token}= req.body;
    
    try
    {
        const payload = await googleVerify(id_token);        
        let correo = payload.email;
        let usuario= await Usuario.findOne({correo});
        
        if(!usuario)
        {
                       
            const data = {
                nombre:payload.name,
                correo:payload.email,
                password:'123345',
                rol:'ADMIN_ROLE',
                img:payload.picture,
                google:true
            };

            usuario = new Usuario(data);
            await usuario.save();

        }

        //Si el usuario en DB no esta habilitado
        if(!usuario.estado)
        {
            return res.status(401).json({
                msg:'Usuario bloqueado'

            });

        }

        //Generar el JSON WEB TOKEN
        const token = await generarJWT(usuario.id);

        
        res.json({
          usuario
          
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg:`Ocurrio un error ${error} `
        });

    }
   


}


module.exports={login,googleSingIn}