const mongoose = require('mongoose');

    let db;
    
    module.exports = function Connection() {
        if(!db){
            db = mongoose.createConnection(process.env.MONGODB);
            useMongoClient: true;
        }
        return db;
    }