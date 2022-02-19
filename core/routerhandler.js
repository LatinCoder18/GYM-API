const fs = require('fs');
module.exports = {
    load: async () => {
        // Load Routes
        let routes;
        try {
            routes = JSON.parse(await fs.readFileSync('./routes/routes.json', { encoding: 'utf-8' }));
        } catch (error) {
            console.log(error);
        }
        return routes;
    },
    create: async () => {

    },
    createapiroute: async () => {

    },
    createwithmodel: async () => {

    },
    delete: async () => {

    },
}