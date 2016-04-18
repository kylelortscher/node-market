//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Homepage Get
//======================================
router.get('/', function(req, res) {
    res.render('landing/index');
});

//======================================
//Welcome Get
//======================================
router.get('/welcome', function(req, res){
   res.render('landing/welcome');
});

module.exports = router;