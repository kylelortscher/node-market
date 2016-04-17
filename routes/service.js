//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Homepage Get
//======================================
router.get('/show', function(req, res) {
    res.render('service/show');
});


module.exports = router;