const jwt = require ('jsonwebtoken')

                //uid del usuario
const generarJWT=(uid='')=>
{
    return new Promise((resolve,reject)=>
    {   

        const payload = {uid}; // puedo poner los datos que quiera

        jwt.sign(payload,process.env.SECRETEPRIVATEKEY,{
            expiresIn:'2h'
        }, (err, token)=>{

            if(err)
            {
                console.log(err);
                reject ('No se puedo generar el token')
            }
            else
            {
                resolve(token);

            }
        })
            
        


    });


}

module.exports =
{
    generarJWT

}