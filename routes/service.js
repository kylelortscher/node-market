//Express Configuration
var express = require('express');
var router = express.Router();
//======================================
//Show Service Get
//======================================
router.get('/show', function(req, res) {
    res.render('service/show');
});


//======================================
//Show Certain User
//======================================
router.get('/user', function(req, res) {
   res.render('users/show');
});

//======================================
//New Service
//======================================
router.get('/service/new', function(req, res){
   res.render('service/new');
});

//======================================
//Manage Current Services
//======================================
router.get('/services/manage', function(req, res){
    res.render('service/manage');
});

//======================================
//Service Post
//======================================
router.post('/newservice', function(req, res){
    var title       = req.body.title;
    var price       = req.body.price;
    var image       = req.file.image;
    var youtubeUrl  = req.body.youtubeUrl;
    var category    = req.body.category;
    var description = req.body.description;
    var dueDate     = req.body.dueDate;
    var refund      = req.body.refund;
    var email       = req.user.email;

});

module.exports = router;