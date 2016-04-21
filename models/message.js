//USER MODEL
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    created:  {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', messageSchema);