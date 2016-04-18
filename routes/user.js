//Express Configuration
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require("../models/user");

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
        res.redirect("/signup");
    } else if (!validateUsername(username)) {
        req.flash("error", "Not a Valid Username Please Only Use Letters, and Numbers");
        res.redirect("/signup");
    } else if (password.length < 8) {
        req.flash("error", "Password Must Be Longer Then 8 Characters");
        res.redirect("/signup");
    } else {
        var newUser = {username: username, email: email, password: hash};
        User.create(newUser, function(err, user){
           if(err) {
               console.log(err);
               if(err.code === 11000) {
                   req.flash("error", "Email/Username Is Already Taken");
                   res.redirect('/signup');
               }
           } else {
               //SETTING UP THE SESSION
               req.auth.user = user.email;
               req.flash("info", "Thanks for signin up!");
               res.redirect('/');
           }
        });
    }

});

//======================================
//Login Post
//======================================
router.post('/login', function(req, res){
    User.findOne({email: req.body.email}, function(err, user) {
       if(!user) {
           req.flash("error", "No Username/Email Found");
           res.redirect('/login');
       } else {
           if (bcrypt.compareSync(req.body.password, user.password)) {
               //Everything Matches
               req.auth.user = user.email;
               req.flash("info", "Successfully Logged In!");
               res.redirect('/');
           } else {
               //
               req.flash("error", "Wrong Credentials Pleas Try Again");
               res.redirect('/login');
           }
       }
    });
});

//======================================
//Using For Testing Sessions
//======================================
router.get('/json', function(req, res){
    res.json(req.user);
});

//======================================
//Logout
//======================================
router.get('/logout', function(req, res) {
    if (req.auth) {
        req.auth.reset();
    }
    req.flash("info", "Successfully logged out!");
    res.redirect('/login');
});



module.exports = router;