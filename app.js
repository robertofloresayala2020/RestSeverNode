require('dotenv').config();
const Server = require('./models/server');


/*Instancia al server*/
const server = new Server();

server.listen();


