/*destructura para usar request y response */
const { response, request } = require('express');
/*Importamo el model sugieren que le pongan mayuscula*/
const Usuario = require('../models/usuario');
const {bcryptjs} = require('bcrypt');


const usuariosGet = async(req = request, res = response) => {
 
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; //Para obtener del url
    const {limite =3,desde = 0}  = req.query;
    const query = {estado:true}

    

    
    /*const  usuarios = await Usuario.find(query). 
                    skip(Number(desde)).     //paginar
                    limit(Number(limite)); // numero de  items*/

    //const total = await Usuario.countDocuments(query);

    //Disparo de dos peticiones de manera simultanea
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query). 
                skip(Number(desde)).     //paginar      
                limit(Number(limite)),
    
    ]);

    res.json({
        total, usuarios});
}

const usuariosPost = async (req, res = response) => {
    
    
    
    const{nombre,correo,password,rol} = req.body; //Recibmos el body
    const  usuario= new Usuario ({nombre,correo,password, rol}) //Invocamos el esquema y le enviamos el body
    
    /*const { nombre, edad } = req.body; //Para obtener del body*/
    const body = req.body;
    
    
    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;  //para obtener el parametro de segemento
    
    const {_id,password,google,correo,...resto} = req.body; //quita los datos que no desea actualizar


       const usuario= await Usuario.findByIdAndUpdate(id,resto) ;

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {

   const{id} = req.params;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
       usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}