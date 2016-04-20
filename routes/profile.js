//Express Configuration
var express = require('express');
var router = express.Router();
var User = require("../models/user");


//======================================
//Get Current Profile
//======================================
router.get('/profile', function(req, res) {
    User.findOne({email: req.user.email}, function(err, user){
       if(err) {
           console.log(err);
       } else {
           res.render('profile/index', {user:user});
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



module.exports = router;