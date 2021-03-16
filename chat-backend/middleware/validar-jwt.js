const jwt = require('jsonwebtoken');



const validarJWT = ( req, res, next ) =>{


    try {

        const token = req.header('x-token');
      
        if(!token){

           return res.json({
                ok: false,
                msg: 'No hay token en la peticion'
            })

        }

        const { uid } = jwt.verify( token,process.env.JWT_KEY );
        req.uid = uid;

        next();

    } catch (error) {

        console.log('token no valido');
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
        
    }



}

module.exports = {
    validarJWT
}