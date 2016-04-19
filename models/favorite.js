//USER MODEL
var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({
    userEmail: String,
    objectId: String
});

module.exports = mongoose.model('Favorite', favoriteSchema);