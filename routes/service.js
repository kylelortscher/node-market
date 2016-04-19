//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var User = require("../models/user");


//======================================
//Show Service Get
//======================================
router.get('/service/:id', function(req, res) {
    Service.findOne({id: req.params.id}, function(err, service){
       if(err) {
           console.log(err);
       } else {
           res.render('service/show', {service:service});
       }
    });
});

//======================================
//Show Specific Users Profile
//======================================
router.get('/user/:username', function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
       if(err) {
           console.log(err);
       } else {
           res.render('users/show', {user:user});
       }
    });
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
//TODO FIX GET USERNAME OF USER CLICKED
router.get('/services/manage', function(req, res){
    User.findOne({email: req.user.email}, function(err, user){
       if(err) {
           console.log(err);
       } else {
           Service.find({email: req.user.email}, function(err, services){
              if(err) {
                  console.log(err);
              } else {
                  res.render("service/manage", {services:services});
              }
           });
       }
    });
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

    //Check If Title Is There
    if(title == '') {
        req.flash("error", "Title Can't Be Empty");
        res.redirect('/service/new');
        next();
    }
    //Check If Price Is There
    if(price == '') {
        req.flash("error", "Price Can't Be Empty");
        res.redirect('/service/new');
        next();
    }

    //Check If Description Is There
    if(description == '') {
        req.flash("error", "Description Can't Be Empty");
        res.redirect('/service/new');
        next();
    }

    //Checking Is Price Is Only Numbers
    function onlyNumbers(price) {
        var reg = /^\d+$/;
        return reg.test(price);
    }
    if(!onlyNumbers(price)){
        req.flash("error", "Price Can Only Be Numbers No Decimal Points Allowed");
        res.redirect('/service/new');
        next();
    }

    //Checking Price Length
    if(price > 500) {
        req.flash("error", "Price Was Too High");
        res.redirect("/service/new");
        next();
    }

    //Check If Title Length
    if(title.length > 45){
        req.flash("error", "Your title is only allowed to be 45 characters");
        res.redirect("/service/new");
        next();
    }

    //Check Youtube Url
    function checkYoutubeUrl(youtubeUrl) {
        var reg = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return reg.test(youtubeUrl);
    }
    if(!checkYoutubeUrl(youtubeUrl)) {
        req.flash("error", "Youtube link is not valid");
        res.redirect("/service/new");
        next();
    }

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