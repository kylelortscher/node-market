//Models
var User = require("../models/user");

//===============================
//ALL MIDDLEWARE STORED HERE
//===============================


//EMPTY OBJECT TO PUT FUNCTIONS INSIDE
var middlewareObj = {};

//===============================
//CHECK IF USER IS LOGGED IN
//===============================
middlewareObj.requireLogin = function (req, res, next){
    if (!req.user) {
        res.redirect('/login');
    } else {
        return next();
    }
};

//===================================================
//CHECK IF USER IS LOGGED IN DISPLAYING FLASH MESSAGE
//===================================================
middlewareObj.requireLoginFlash = function (req, res, next){
    if (!req.user) {
        req.flash("error", "You must be logged in!");
        res.redirect('/login');
    } else {
        return next();
    }
};


//===================================================
//CHECK IF USER IS ALREADY LOGGED IN
//===================================================
middlewareObj.alreadyLoggedIn = function (req, res, next){
    if(!req.user) {
        next();
    } else {
        req.flash("error", "You are already logged in!");
        res.redirect("/");
    }
};

//===================================================
//User Can't Message Himself
//===================================================






module.exports = middlewareObj;