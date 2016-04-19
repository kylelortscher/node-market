//USER MODEL
var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
    email: String,
    title: String,
    price: Number,
    dueDate: Number,
    youtubeUrl: String,
    category: String,
    description: String,
    refund: String
});

module.exports = mongoose.model('Service', serviceSchema);