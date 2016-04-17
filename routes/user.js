//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Signup Get
//======================================
router.get('/signup', function(req, res) {
    res.render('user/signup');
});

//======================================
//Login Get
//======================================
router.get('/signup', function(req, res) {
    res.render('user/login');
});


module.exports = router;