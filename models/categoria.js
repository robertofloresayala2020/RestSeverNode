

const {Schema,model} = require('mongoose');
const CategoriaSchema= Schema(

    {
        nombre:
        {
            type:String,
            required:[true,'El nombre es obligatorio'],
            unique:true
        },
        estado:
        {
            type:Boolean,
            default:true,
            required:true
        },
        usuario:
        {
            type:Schema.Types.ObjectId,
            ref:'Usuario',
            required:true
        }
                
    }
    
    );

    
/*Sobreescribir el methodo JSON y es function normal porque usara this*/
/*para no eniar password*/
CategoriaSchema.methods.toJSON = function()
{
    /*usa el operador rest para sacarlos en usuario*/
    const {__v,estado,...data} = this.toObject();

    return data;

}


    module.exports = model('Categoria',CategoriaSchema);