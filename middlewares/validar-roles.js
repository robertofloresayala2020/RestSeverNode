const {response} = require('express')

const esAdminRole=(req,res= response, next)=>
{

    if(!req.usuario)
    {   
        return res.status(500).json({
            msg:'Se requiere verificar el rol sin validar el token'

        });
    }

    const {rol, nombre} = req.usuario;

    if(rol!=='ADMIN_ROLE')
    {
            return res.status(401).json(
                {
                    msg:`${nombre}  no es administrador- operaión invalida`

                }
            )
    }

    next();

}

//...Operaodr Rest
const tieneRoles=(...roles)=>
{
    //
    return (req, res =response,next)=>
    {
        
        if(!req.usuario)
        {   
            return res.status(500).json({
                msg:'Se requiere verificar el rol sin validar el token'
    
            });
        }

        if(!roles.includes(req.usuario.rol))
        {
           
            return res.status(401).json
            ({
                msg: `El servicio requiere uno de estos roles ${roles} y el rol es ${req.usuario.rol}`

            });
        }

        
         
        

        next();
    }
   

}

module.exports={

    esAdminRole, tieneRoles
}