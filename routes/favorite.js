//Express Configuration
var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var User = require("../models/service");
var Favorite = require("../models/favorite");

//======================================
//Messages Get
//======================================

//Getting The Favorites Of The Current User
router.get('/favorites', function(req, res){
    var userEmail = req.user.email;
    Favorite.find({userEmail: userEmail}, function(err, favorites){
       if(err) {
           console.log(err);
       } else {
           res.render('favorites/index', {favorites:favorites});
       }
    });
});

//Clicking The Favorite Button
router.post('/favorite/:id', function(req, res){
    //Getting Current User Email, and Object Id
    var userEmail = req.user.email;
    var objectId = req.params.id;

    //Creating The New Favorite Object
    var newFavorite = {userEmail: userEmail, objectId: objectId};

    Favorite.create(newFavorite, function(err, favorite){
       if(err) {
           console.log(err);
       } else {
           //Redirecting Back To The Current Page
           Service.findById(req.params.id, function(err, service){
              if(err) {
                  console.log(err);
              } else {
                  req.flash("info", "Successfully Favorited This Service");
                  res.redirect('/service/' + service.titleSeo);
              }
           });
       }
    });
});

module.exports = router;
