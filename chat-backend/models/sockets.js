const { userConnectSocket, 
        userDisconnectSocket, 
        getUsers, 
        getMessage} = require('../controllers/sockets');
const { comprobarJWT } = require('../helper/jwt')

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connect', async( socket ) => {

           
           const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);

            if(!valido){
                    console.log('socke no identificado');
                    return socket.disconnect();
            }

            await userConnectSocket( uid );

            //lista de usuarios
                this.io.emit('lista-usuarios', await getUsers());


            //Unir a un usuario a una sala de socket.io
                socket.join( uid );


            //Evento de envio de mensaje para alguien especifico
                socket.on('mensaje-personal', async(payload) =>{
                    
                    const message = await getMessage(payload);
                    this.io.to( payload.to ).emit('mensaje-personal', message);
                    this.io.to( payload.from ).emit('mensaje-personal', message);
                })


            //desconectarse de la sala
                socket.on('disconnect', async() =>{
                
                await userDisconnectSocket(uid);
                this.io.emit('lista-usuarios', await getUsers())

                })
        
        });
    }


}


module.exports = Sockets;