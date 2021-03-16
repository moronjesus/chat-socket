const { validationResult } = require("express-validator");

const validarCampos = ( req, resp, next ) =>{

    const errores = validationResult(req);

    if(!errores.isEmpty()){

        return resp.status(400).json({
            ok: false,
            msg: errores.mapped(),
        })
    }

    next();

}

module.exports = {
    validarCampos
}