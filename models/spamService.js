//USER MODEL
var mongoose = require('mongoose');

var spamServiceSchema = mongoose.Schema({
    reporterEmail: String,
    serviceReportedTitleSeo: String
});

module.exports = mongoose.model('SpamService', spamServiceSchema);