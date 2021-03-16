// Servidor de Express
const express           = require('express');
const http              = require('http');
const socketio          = require('socket.io');
const path              = require('path');
const cors              = require('cors');
const { dbConection }   = require('../database/config')
const Sockets           = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server , {cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }});

        //conection DB
        dbConection();
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        //Parseo json
        this.app.use( express.json() )

        //Api rest
        this.app.use('/api/auth', require('../router/auth'));
        this.app.use('/api/mensaje', require('../router/mensaje'));


    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;