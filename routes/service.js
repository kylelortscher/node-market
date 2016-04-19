//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Show Service Get
//======================================
router.get('/show', function(req, res) {
    res.render('service/show');
});


//======================================
//Show Certain User
//======================================
router.get('/user', function(req, res) {
   res.render('users/show');
});

//======================================
//New Service
//======================================
router.get('/service/new', function(req, res){
   res.render('service/new');
});

//======================================
//Manage Current Services
//======================================
router.get('/services/manage', function(req, res){
    res.render('service/manage');
});


module.exports = router;