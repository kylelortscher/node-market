//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
//======================================
//Homepage Get
//======================================
router.get('/', function(req, res) {
    Service.find({}, function(err, services){
        if(err) {
            console.log("error :(");
        } else {
            res.render("landing/index", {services:services});
        }
    });
});

//======================================
//Welcome Get
//======================================
router.get('/welcome', function(req, res){
    res.render('landing/welcome');
});


module.exports = router;