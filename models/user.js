//USER MODEL
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});

module.exports = mongoose.model('User', userSchema);