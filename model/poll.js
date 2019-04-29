const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: String, required:false },
  options: [{ name: { type: String, required: true } , votes: { type: Number, default: 0 } }]
}, { timestamps: true })



Poll.methods.votesCount = function() {
  return this.options.reduce((before, actual) => { return before.votes + actual.votes });
};

Poll.methods.votesPercentage = function(index) {
  const totalVotes = this.votesCount();
  const optionPoll = this.options[index]
  if(optionPoll.votes > 0)
    return (optionPoll.votes * 100) / totalVotes
  else
    return 0
};

module.exports = mongoose.model('Poll', Poll);