//Express Configuration
var express  = require('express');
var router   = express.Router();
var Service  = require("../models/service");
var User     = require("../models/user");
var Favorite = require("../models/favorite");
var mongoose = require('mongoose');

//======================================
//Favorites Get
//======================================
router.get('/favorites', function(req, res){
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
router.post('/services/:titleSeo/favorites', function(req, res){
    var titleSeo = req.params.titleSeo;
    var userEmail = req.user.email;

    var newFavorite = {titleSeo: titleSeo, userEmail: userEmail};
    Favorite.create(newFavorite, function(err, favorite){
       if(err) {
           console.log(err);
       } else {
           req.flash("info", "Successfully Favorited This Service");
           res.redirect('/view/service/' + titleSeo);
       }
    });
});

module.exports = router;
