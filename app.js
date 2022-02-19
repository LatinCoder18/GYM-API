require('dotenv').config()
const Server = require('./core/server');
// Web App Module
const webserver  = new Server();

const app = async () => { 
    // Here you can start modules
    webserver.listen();
}
app();