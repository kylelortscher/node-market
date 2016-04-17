//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Homepage Get
//======================================
router.get('/', function(req, res) {
    res.render('landing/index');
});


module.exports = router;