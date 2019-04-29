const mongoose = require('mongoose');

    let db;
    
    module.exports = function Connection() {
        if(!db){
            db = mongoose.createConnection('mongodb://localhost/polls');
            useMongoClient: true;
        }
        return db;
    }