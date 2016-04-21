//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var middleware = require("../middleware/index.js");


//======================================
//Purchase Get
//======================================
router.get('/purchases',middleware.requireLoginFlash, function(req, res) {
    res.render('purchases/index');
});



module.exports = router;