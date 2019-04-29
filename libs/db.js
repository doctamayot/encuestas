const mongoose = require('mongoose');

    let db;
    
    module.exports = function Connection() {
        if(!db){
            db = mongoose.createConnection('mongodb://localhost:27017/polls');
            useMongoClient: true;
        }
        return db;
    }