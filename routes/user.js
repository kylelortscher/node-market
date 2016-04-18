//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Profile Get
//======================================
router.get('/profile', function(req,res){
    res.render('settings/profile');
});

//======================================
//Signup Post
//======================================


//======================================
//Login Post
//======================================

module.exports = router;