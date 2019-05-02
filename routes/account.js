module.exports = (app) => {
    const accounts = require('../control/accounts.js');

    app.get('/register', accounts.new);  
    app.post('/register', accounts.create);    
    app.get('/login', accounts.newSession);   
    app.post('/login', accounts.createSession);   
    app.get('/logout', accounts.destroySession);
  }