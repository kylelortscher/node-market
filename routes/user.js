//Express Configuration
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var middleware = require("../middleware/index.js");
var User = require("../models/user.js");

//======================================
//Profile Get
//======================================
router.get('/profile', function(req,res){
    res.render('settings/profile');
});

//======================================
//Login Get
//======================================
router.get('/login', middleware.alreadyLoggedIn, function(req, res){
   res.render('users/login');
});

//======================================
//Signup Get
//======================================
router.get('/signup', middleware.alreadyLoggedIn, function(req, res){
    res.render('users/signup');
});

//======================================
//Signup Post
//======================================
router.post('/signup', middleware.alreadyLoggedIn, function(req, res) {

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
               res.redirect('/welcome');
           }
        });
    }

});

//======================================
//Login Post
//======================================
router.post('/login', middleware.alreadyLoggedIn, function(req, res){
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
//Show Specific Users Profile
//======================================
router.get('/user/:username', function(req, res){
    //Finding The User Based On The Username Param Passed
    User.findOne({username: req.params.username}, function(err, user){
        if(err) {
            console.log(err);
        } else {
            //Once User If Found Take The User's Email, and Search For All Services Made By The User
            Service.find({email: user.email}, function(err, services){
                if(err) {
                    console.log(err);
                } else {
                    //Display The User, and All Of The Services Associated With That User
                    res.render('users/show', {user:user, services:services});
                }
            });
        }
    });
});

//======================================
//Logout
//======================================
router.get('/logout',middleware.requireLoginFlash, function(req, res) {
    if (req.auth) {
        req.auth.reset();
    }
    req.flash("info", "Successfully logged out!");
    res.redirect('/login');
});



module.exports = router;