//Express Configuration
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
//======================================
//Profile Get
//======================================
router.get('/profile', function(req,res){
    res.render('settings/profile');
});

//======================================
//Login Get
//======================================
router.get('/login', function(req, res){
   res.render('users/login');
});

//======================================
//Signup Get
//======================================
router.get('/signup', function(req, res){
    res.render('users/signup');
});

//======================================
//Signup Post
//======================================
router.post('/signup', function(req, res) {

    var password = req.body.password;
    //TODO SETUP PASSWORD Check
    if (password.length < 8) {
        req.flash("error", "Password Must Be Longer Then 8 Characters");

    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var username = req.body.username;
    var email = req.body.email;

    //TODO Validate Email
    //Checking For Proper Email
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //TODO Validate Username
    //Checking For Proper Username
    function validateUsername(username) {
        var re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    if(!validateEmail(email)) {
        req.flash("error", "Not a valid Email Address!");
        res.redirect("/")
    } else if (!validateUsername(username)) {

    }

});

//======================================
//Login Post
//======================================

module.exports = router;