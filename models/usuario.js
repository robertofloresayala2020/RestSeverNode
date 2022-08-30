/*const { model, models } = require('mongoose');*/

const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{ type:String,
             required:[true, 'El nombre es obligatorio']
            },
    correo:{ type:String,
              required:[true, 'El nombre es obligatorio'],
              unique: true
            },
     password:{ type:String,
                required:[true, 'La contraseña es obligatoria'],                
              },
    img:{ type:String,                
              },
    rol:{ type:String,
           required:[true],
           enum:['ADMIN_ROLE','USER_ROLE']                
        },
    estado:{ type:Boolean,                
             default:true,
        },
    google:{
        type:Boolean,
        default:false

    }

});

/*Sobreescribir el methodo JSON y es function normal porque usara this*/
/*para no eniar password*/
UsuarioSchema.methods.toJSON = function()
{
    /*usa el operador rest para sacarlos en usuario*/
    const {__v,password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;

}

module.exports = model('Usuario',UsuarioSchema);