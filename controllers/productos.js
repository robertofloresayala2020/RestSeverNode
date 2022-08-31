const { response } = require("express");
const {Producto}= require('../models');

const obtenerProductos =async (req,res= response)=>
{
  //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query; //Para obtener del url
  const {limite =3,desde = 0}  = req.query;
  const query = {estado:true}
  
  //Disparo de dos peticiones de manera simultanea
  const [total,productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto.find(query). 
              populate ('usuario','nombre'). // PARA OBTENER EL NOMBRE DEL USUARIO
              populate('categoria','nombre').
              skip(Number(desde)).     //paginar      
              limit(Number(limite)),
  
  ]);

  res.json({
      total, 
      productos});

}


const obtenerProducto = async(req, res = response)=>
{

    const {id} =req.params;
    const producto = await Producto.findById(id).
         populate ('usuario','nombre').
         populate ('categoria','nombre');
    
         res.json(producto);


}
const creaProducto = async (req,res=response)=>
{
    const {usuario,...body }= req.body;

    const productoDB= await Producto.findOne({nombre:body.nombre});

    if(productoDB)
    {
        return res.status(400).json(
            {
                msg:`El Producto ${productoDB.nombre}, ya existe`
                
            });
                    
    }

    const data =
    {   ...body,        
        usuario:req.usuario._id
    }

    const producto =  new Producto(data);
    await producto.save();
    res.status(201).json(producto);

}


const actualizaProducto = async(req, res= response)=>
{

    const {id} = req.params;
    const{estado, usuario,...data} =   req.body;

    if(data.nombre)
    {
        data.nombre = data.nombre .toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json({producto});


}


const borrarProducto = async(req,res=response)=>
{
    const {id} = req.params;
    const productoBorrada = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(productoBorrada);
}

module.exports=
{
    creaProducto,
    obtenerProducto,
    obtenerProductos,
    actualizaProducto,
    borrarProducto

}