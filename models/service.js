//USER MODEL
var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
    email: { type: String, require: true },
    title: { type: String, unique: true },
    titleSeo: { type: String, unique: true },
    price: { type: Number, require: true },
    dueDate: { type:Number, require:true},
    youtubeUrl: String,
    category: {type:String, require:true},
    description: {type:String, require:true},
    refund: {type:String, require:true}
});

module.exports = mongoose.model('Service', serviceSchema);