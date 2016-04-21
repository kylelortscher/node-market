//Express Configuration
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var middleware = require("../middleware/index.js");
var User = require("../models/user.js");
var Service = require("../models/service.js");


//======================================
//Get Current Profile
//======================================
router.get('/profile', function(req, res) {
    User.findOne({email: req.user.email}, function(err, user){
        if(err) {
            console.log(err);
        } else {
            Service.find({email: req.user.email}, function(err, services){
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
//Edit Current Profile
//======================================
router.get('/profile/edit', function(req, res){
    User.findOne({email: req.user.email}, function(err, user){
        if(err) {
            console.log(err);
        } else {
            res.render('profile/edit', {user:user})
        }
    });
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
    var image = "https://static.pexels.com/photos/9416/light-car-display-shop-large.jpg";
    var description = "....";

    //Checking For Proper Email
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    //Checking For Proper Username
    function validateUsername(username) {
        var re = /^[a-zA-Z0-9]+$/;
        return re.test(username);
    }

    //Regex for password must be 8 characters, with One Number, and One Letter
    function checkPwd(str) {
        if (str.length < 6) {
            return("too_short");
        } else if (str.length > 20) {
            return("too_long");
        } else if (str.search(/\d/) == -1) {
            return("no_num");
        } else if (str.search(/[a-zA-Z]/) == -1) {
            return("no_letter");
        } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
            return("bad_char");
        }
        return("ok");
    }

    var answer = checkPwd(password);

    if(answer == "too_short") {
        req.flash("error", "Password Must Be Greater Then 6 Characters");
        return res.redirect('/signup');
    }

    if(answer == "too_long") {
        req.flash("error", "Password Must Be Less Then 20 Characters");
        return res.redirect('/sigunup');
    }

    if(answer == "no_num" || "no_letter") {
        req.flash("error", "Your password must be a combination of letters and numbers");
        return res.redirect('/signup');
    }

    if(answer == "bad_char") {
        req.flash("error", "Only Numbers, and Letters Are Allowed!");
        return res.redirect('/signup');
    }

    //Checking If Valid Email
    if(!validateEmail(email)) {
        req.flash("error", "Not a valid email Addresss!");
        return res.redirect("/signup");
    }

    //Checking If Valid Username
    if(!validateUsername(username)) {
        req.flash("error", "Not a valid username");
        return res.redirect("/signup");
    }


    var newUser = {username: username, email: email, password: hash, image: image, description: description};
    User.create(newUser, function(err, user){
       if(err) {
           console.log(err);
       } else {
           req.auth.user = user.email;
           req.flash("info", "Thanks for signing up!");
           res.redirect('/welcome');
       }
    });

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