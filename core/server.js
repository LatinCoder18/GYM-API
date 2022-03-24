const express = require('express');
const cors = require('cors');
const User = require('../models/user');
const { dbConnection } = require('../database/config');
const { load } = require('./routerhandler');
const { systeminfo } = require('./systeminfo');
const validarJSON = require('../middlewares/ValidateJSON');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const { main } = require('../modules/crons')
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;
        // Conectar base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares()
        // Rutas de mi app
        this.routes();
        //  this.listen();
        this.cron();
        // Crea al usuario administrador si no existe ninguno en la base de datos

    }

    middlewares() {
        // Protección
        this.app.use(cors())
        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
        this.app.use(morgan('tiny', { stream: accessLogStream }));
        this.app.use(morgan('tiny'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(validarJSON);
        this.app.use(express.static('public'))
    }
    async routes() {
        /**
         * Here we will load routes and setup to our webserver
         */
        // Load Routes
        const routes = await load();
        routes.map((element) => {
            this.app.use(`${element.path}`, require(`${element.route}`));
        });
        this.app.use('/', require('../routes/defaults'));

    }
    async conectarDB() {
        await dbConnection();
    }
    async cron() {
        main();
    }
    async listen() {
        console.clear();
        this.app.listen(this.port, () => {
            console.log(`${process.env.SERVER_NAME.blue} server running on port`.white, this.port.blue);
        })
        await systeminfo();
    }
 
}
module.exports = Server;