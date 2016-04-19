//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");


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
    var image       = "https://static.pexels.com/photos/9416/light-car-display-shop-large.jpg";
    var youtubeUrl  = req.body.youtubeUrl;
    var category    = req.body.category;
    var description = req.body.description;
    var dueDate     = req.body.dueDate;
    var refund      = req.body.refund;
    var email       = req.user.email;

    var newService = {title: title, price: price, image: image,youtubeUrl: youtubeUrl, category: category, description: description, dueDate: dueDate, refund: refund, email: email};
    Service.create(newService, function(err, user){
        if(err) {
            console.log(err);
        } else {
            req.flash("info", "Your Service Has Been Posted!");
            res.redirect('/');
        }
    });

});

module.exports = router;