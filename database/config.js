const mongoose = require("mongoose")
require('colors')

const dbConnection = async () => {
    console.log('Connecting to database'.cyan)
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
       // console.log('Database is Online'.green)
    } catch (error) {
        console.clear();
        console.log(error)
        throw new Error('Database is Offline'.red);
    }
}

module.exports = {
    dbConnection,
}