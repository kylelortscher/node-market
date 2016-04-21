//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var middleware = require("../middleware/index.js");

//======================================
//Profile Settings Get
//======================================
router.get('/settings/account',middleware.requireLoginFlash, function(req, res){
    res.render('settings/account');
});



module.exports = router;
