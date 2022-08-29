const {validationResult}= require('express-validator');

//next para los middelwares  para que pase al siguiente

const validarCampos= (req, res , next)=>
{
    const errors= validationResult(req);  //Validar los campos
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors);

    }

    next();
}

module.exports=
{
    validarCampos

}
