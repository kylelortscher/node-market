//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");

//======================================
//Messages Get
//======================================
router.get('/messages', function(req, res){
    res.render('messages/index');
});


router.get('/message/:username', function(req, res){
   res.render('messages/new');
});


module.exports = router;
