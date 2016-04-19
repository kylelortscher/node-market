//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");


//======================================
//Purchase Get
//======================================
router.get('/purchases', function(req, res) {
    res.render('purchases/index');
});



module.exports = router;