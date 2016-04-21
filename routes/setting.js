//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");

//======================================
//Profile Settings Get
//======================================
router.get('/settings/account', function(req, res){
    res.render('settings/account');
});



module.exports = router;
