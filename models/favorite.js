//USER MODEL
var mongoose = require('mongoose');

var favoriteSchema = mongoose.Schema({
    userEmail: String,
    titleSeo : String
});

module.exports = mongoose.model('Favorite', favoriteSchema);