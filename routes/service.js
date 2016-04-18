//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Show Service Get
//======================================
router.get('/show', function(req, res) {
    res.render('service/show');
});

router.get('/user', function(req, res) {
   res.render('users/show');
});


module.exports = router;