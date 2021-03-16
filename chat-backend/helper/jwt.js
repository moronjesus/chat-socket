const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) =>{


    return new Promise( ( resolve, reject ) =>{

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
         expiresIn: '3h',   
        }, ( error, token ) =>{

            if(error){

                console.log(error);
                reject('Error al general JWT');

            }else{

                resolve(token)
            }
        });
    })
   

};

const comprobarJWT = ( token )=> {

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        return [true, uid]

    } catch (error) {

        return[ false, null]
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}