
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

const IsValidRol = async(rol='') =>{

    const existeRol = await Role.findOne({rol});
    if(!existeRol)
    {
        throw new Error (`El rol ${rol} no esta registrado en la BD`);
        
    }

}

const EmailExist = async(correo='')=>
{
    /**Valida correo*/
    const existeEmail = await Usuario.findOne({correo});
    
    if(existeEmail)
    {
        throw new Error (`El mail ${correo} ya esta registrado en la BD`); 
    }


}

const existeUsuarioPorId = async (id) =>
{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario)
    {

        throw new Error(`El id no existe: ${id}`);

    }

}


const existeCategoria = async (id) =>
{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria)
    {

        throw new Error(`El id no existe: ${id}`);

    }

}


const existeProducto = async (id) =>
{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto)
    {

        throw new Error(`El id no existe: ${id}`);

    }

}




module.exports = {IsValidRol,
                 EmailExist,
                 existeUsuarioPorId,
                 existeCategoria,
                 existeProducto}

