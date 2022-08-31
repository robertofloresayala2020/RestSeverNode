const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        /*this.usuariosPath = '/api/usuarios';
        this.authPath ='/api/auth';
        this.authPath ='/api/categorias';*/

        this.paths=
        {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias:'/api/categorias' ,
            productos:'/api/productos',
            buscar:'/api/buscar',

        }

        //Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async  conectarDB()
    {
        await dbConnection();

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
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
      
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
