//Express Configuration
var express  = require('express');
var router   = express.Router();
var Service  = require("../models/service");
var User     = require("../models/user");
var Favorite = require("../models/favorite");
var mongoose = require('mongoose');
var middleware = require("../middleware/index.js");

//======================================
//Favorites Get
//======================================
router.get('/favorites',middleware.requireLoginFlash, function(req, res){
    Favorite.find({userEmail: req.user.email}, function(err, favorites){
       if(err) {
           console.log(err);
       } else {
           var favoriteService = [];
           for(var i=0;i<favorites.length;i++) {
               favoriteService.push(favorites[i].titleSeo);
           }
           Service.find({titleSeo: { $in: favoriteService}}, function(err, foundFavorites){
               if(err) {
                   console.log(err);
               } else {
                   res.render('favorites/index', {foundFavorites:foundFavorites});
               }
           });
       }
    });
});

router.get('/json', function(req, res){
   res.json(req.user);
});


//Clicking The Favorite Button
router.post('/services/:titleSeo/favorites',middleware.requireLoginFlash, function(req, res){
    var titleSeo = req.params.titleSeo;
    var userEmail = req.user.email;

    var newFavorite = {titleSeo: titleSeo, userEmail: userEmail};

    Favorite.findOne({titleSeo: titleSeo, userEmail: userEmail}, function(err, found){
       if(found) {
           req.flash("error", "You already favorited this product!");
           res.redirect('/view/service/' + titleSeo);
       } else {
           Favorite.create(newFavorite, function(err, favorite){
               if(err) {
                   console.log(err);
               } else {
                   req.flash("info", "Successfully Favorited This Service");
                   res.redirect('/view/service/' + titleSeo);
               }
           });
       }
    });
});

module.exports = router;
