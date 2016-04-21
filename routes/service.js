//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service.js");
var middleware = require("../middleware/index.js");
var User = require("../models/user.js");
var SpamService = require("../models/spamService");

//==================================
//Service Show One Page
//==================================
router.get('/view/service/:titleSeo', function(req, res){
   Service.findOne({'titleSeo': req.params.titleSeo}, function(err, service){
      if(err) {
          console.log(err);
      } else {
          User.findOne({email: service.email}, function(err, user){
             if(err) {
                 console.log(err);
             } else {
                 res.render('service/show', {service:service, user:user});
             }
          });
      }
   });
});


//======================================
//New Service
//======================================
router.get('/service/new',middleware.requireLoginFlash, function(req, res){
   res.render('service/new');
});

//======================================
//Manage Current Services
//======================================
//TODO FIX GET USERNAME OF USER CLICKED
router.get('/services/manage',middleware.requireLoginFlash, function(req, res){
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
//Spam Service Post
//======================================
router.post('/spamService/:titleSeo',middleware.requireLoginFlash, function(req, res){
    var reporterEmail = req.user.email;
    var serviceReportedTitleSeo = req.params.titleSeo;

    //Checking If The User Has Already Filled This Service As Spam
    SpamService.find({reporterEmail: reporterEmail, serviceReportedTitleSeo: serviceReportedTitleSeo}, function(err, spamService){
        if(err) {
            console.log(err);
        } else {
            if(spamService.length > 0){
                //Array Return Something
                req.flash("error", "You have already reported this service we are checking into it!");
                return res.redirect('/view/service/' + serviceReportedTitleSeo);
            } else {
                //Empty Array
                var newSpamService = {reporterEmail: reporterEmail, serviceReportedTitleSeo: serviceReportedTitleSeo}
                SpamService.create(newSpamService, function(err, spamService){
                    if(err) {
                        console.log(err);
                    } else {
                        req.flash("info", "Successfully Reported this Service We Will Check Into This!");
                        return res.redirect('/view/service/' + serviceReportedTitleSeo);
                    }
                });
            }
        }
    });
});

//======================================
//Service Post
//======================================
router.post('/newservice', middleware.requireLoginFlash, function(req, res){
    var title       = req.body.title;
    var price       = req.body.price;
    var image       = "https://static.pexels.com/photos/9416/light-car-display-shop-large.jpg";
    var youtubeUrl  = req.body.youtubeUrl;
    var category    = req.body.category;
    var description = req.body.description;
    var dueDate     = req.body.dueDate;
    var refund      = req.body.refund;
    var email       = req.user.email;
    var titleSeo    = title.split(' ').join('-');

    //Check If Title Is There
    if(title == '') {
        req.flash("error", "Title Can't Be Empty");
        return res.redirect('/service/new');
    }
    //Check If Price Is There
    if(price == '') {
        req.flash("error", "Price Can't Be Empty");
        return res.redirect('/service/new');
    }

    //Check If Description Is There
    if(description == '') {
        req.flash("error", "Description Can't Be Empty");
        return res.redirect('/service/new');
    }

    //Checking Is Price Is Only Numbers
    function onlyNumbers(price) {
        var reg = /^\d+$/;
        return reg.test(price);
    }
    if(!onlyNumbers(price)){
        req.flash("error", "Price Can Only Be Numbers No Decimal Points Allowed");
        return res.redirect('/service/new');
    }

    //Checking Price Length
    if(price > 500 && price < 0) {
        req.flash("error", "Price Was Too Low Or High");
        return res.redirect("/service/new");
    }

    //Check If Title Length
    if(title.length > 55){
        req.flash("error", "Your title is only allowed to be 45 characters");
        return res.redirect("/service/new");
    }

    //Make Sure Title Is Only alphanumeric
    function checkTitleAlphaNumeric(title) {
        var reg = /^[a-z0-9 .\-]+$/i;
        return reg.test(title);
    }
    if(!checkTitleAlphaNumeric(title)){
        req.flash("error", "You are only allowed to use numbers and letters");
        return res.redirect("/service/new");
    }

    //Check Youtube Url
    function checkYoutubeUrl(youtubeUrl) {
        var reg = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return reg.test(youtubeUrl);
    }

    //Youtube Can Be Left Blank, But If They Do Enter Something We Validate It
    if (youtubeUrl != '') {
        if(!checkYoutubeUrl(youtubeUrl)) {
            req.flash("error", "Youtube link is not valid");
            return res.redirect("/service/new");
        }
    }

    var newService = {title: title, price: price, image: image,youtubeUrl: youtubeUrl, category: category, description: description, dueDate: dueDate, refund: refund, email: email, titleSeo: titleSeo};
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