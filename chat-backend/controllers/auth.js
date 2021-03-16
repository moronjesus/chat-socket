const { response }      = require('express');
const User              = require('../models/user');
const bcrypt            = require('bcryptjs');
const { generarJWT }    = require('../helper/jwt');



const createUser = async( req, resp = response ) =>{

    const { email, password } = req.body

    try {

        const existeEmail = await User.findOne({ email });

        if(existeEmail){
            resp.status(400).json({
                ok: false,
                msg: 'El email ya existe'
            })

        }

        const usuario =  new User(req.body);
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

         //Guardar user en bd
        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

        resp.json({
            ok:true,
            usuario,
            token 
        })


        
    } catch (error) {

        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'comuniquese con el administardor'
        });

    }

};

const login = async ( req, resp = response )=>{

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email })

        //Verificar email
        if(!userDB){

            return resp.status(404).json({
                ok:false,
                msg:'Email es incorecto'

            })

        }

        //validar password
        const validPassword = bcrypt.compareSync( password,userDB.password );

        if(!validPassword){

            return resp.status(404).json({
                ok:false,
                msg:'Password es incorecto'

            })
        }


        //Generar token

        const token = await generarJWT( userDB.id);

        resp.json({
            ok : true,
            usuario: userDB,
            token,
        })
        
    } catch (error) {
       
        console.log(error);
        resp.status(500).json({
            ok:false,
            msg: 'comuniquese con el administardor'
        });
        
    }

};


const renewToken = async( req, resp = response )=>{

    const uid = req.uid

    //General un nuevo token
    const token = await generarJWT( uid );
    
    //Obtener usuario por id
    const user = await User.findById( uid );

    resp.json({
        ok : true,
        user,
        token,
      
    })
}

module.exports = {
    createUser,
    login,
    renewToken,
}