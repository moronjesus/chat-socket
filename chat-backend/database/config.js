const mongoose = require('mongoose')

const dbConection = async() =>{

    try {

       await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
        })

        console.log(' DB conectado');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos -- vea logs')
        
    }
    

}

module.exports ={
    dbConection
}