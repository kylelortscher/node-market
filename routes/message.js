//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var User = require("../models/service");
var Message = require("../models/message");

//======================================
//Messages Get
//======================================
router.get('/messages', function(req, res){
    Message.find( { $or: [ { sender:req.user.email  }, { receiver: req.user.email } ] }, function(err, userMessages){
        if(err) {
            console.log(err);
        } else {
            res.render('messages/index', {userMessages:userMessages});
        }
    });
});


router.get('/message/:username', function(req, res){
   res.render('messages/new');
});

router.post('/message/:username', function(req, res){
    var sender = req.user.email;
    var receiver = req.params.username;

    User.findOne({username: req.params.username}, function(err, foundUser){
        if (foundUser == null) {
            req.flash("error", "User Dosen't Exist!");
             return res.redirect('/');
        } else {
            var receiver = foundUser.email;
            var newMessage = {sender: sender, receiver: receiver};
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
