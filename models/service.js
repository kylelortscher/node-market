//USER MODEL
var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
    email: String,
    title: { type: String, unique: true },
    titleSeo: { type: String, unique: true },
    price: Number,
    dueDate: Number,
    youtubeUrl: String,
    category: String,
    description: String,
    refund: String
});

module.exports = mongoose.model('Service', serviceSchema);