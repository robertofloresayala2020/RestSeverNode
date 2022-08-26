const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body para post y put, es importante para pasar la información
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() 
    {   //Le pasa las el middleware indicandole las rutas
        // this.usuariosPath es como lo llamara 
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
