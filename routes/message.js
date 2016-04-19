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
    res.render('messages/index');
});


router.get('/message/:username', function(req, res){
   res.render('messages/new');
});

router.post('/message/:username', function(req, res){
    User.findOne({username: req.params.username}, function(err, receiver){
       if(err) {
           console.log(err);
       } else {
           //Person Sending
           var sender = req.user.email;
           //Person Reciving
           var receiver = receiver.email;
           //TODO MAKE MORE COMPLEX
           var newMessage = {sender: sender, receiver: receiver};
           Message.create(newMessage, function(err, success){
              if(err) {
                  console.log(err);
              }
           });

       }
    });
});

module.exports = router;
