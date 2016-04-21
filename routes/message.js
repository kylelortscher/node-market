//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var User = require("../models/user");
var Message = require("../models/message");
var middleware = require("../middleware/index.js");

//======================================
//Messages Get
//======================================
router.get('/messages',middleware.requireLoginFlash, function(req, res){
    Message.find( { $or: [ { sender:req.user.email  }, { receiver: req.user.email } ] }, function(err, userMessages){
        if(err) {
            console.log(err);
        } else {
            res.render('messages/index', {userMessages:userMessages});
        }
    });
});


router.get('/message/:username',middleware.requireLoginFlash, function(req, res){
    User.findOne({username: req.params.username}, function(err, receiver){
       if(receiver == null) {
           req.flash("error", "User dosen't exist");
           return res.redirect('/');
       } else {
           res.render('messages/new', {receiver:receiver});
       }
    });
});

router.post('/message/:username',middleware.requireLoginFlash, function(req, res){
    var sender = req.user.email;
    var receiver = req.params.username;
    var body = req.body.body;

    //TODO ADD CHECK FOR USING A @ .com, or Phone Number

    User.findOne({username: req.params.username}, function(err, foundUser){
        if (foundUser == null) {
            req.flash("error", "User Dosen't Exist!");
             return res.redirect('/');
        } else {
            var receiver = foundUser.email;
            var newMessage = {sender: sender, receiver: receiver, body: body};
            Message.create(newMessage, function(err, messages){
               if(err) {
                   console.log(err);
               } else {
                   req.flash("info", "Emailed User!");
                   res.redirect('/messages');
               }
            });
        }
    });
});

module.exports = router;
