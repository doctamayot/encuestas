module.exports = (app) => {
  const polls = require('../control/polls.js');
  
  
  app.get('/', polls.findAll);
  app.get('/polls/new', polls.new);
  app.post('/polls', polls.create);
  app.get('/polls/:pollId', polls.findOne);
  app.get('/polls/:pollId/edit', polls.create);
  app.get('/polls/:pollId/delete', polls.delete);
  app.post('/polls/:pollId/vote', polls.vote);
  app.get('/polls/:pollId/results', polls.results);



}