//USER MODEL
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    description: String,
    profileImage: String
});

module.exports = mongoose.model('User', userSchema);