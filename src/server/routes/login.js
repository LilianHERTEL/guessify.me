const express = require('express');
const uniqid = require('uniqid');
var router = express.Router();
const mongoose = require('mongoose');
var passport = require('passport')

router.post('/login',passport.authenticate('local'), function(req, res){
  //assigne l'utilisateur à sa session
  req.session.userID = req.user._id;
  req.session.username = req.user.username;
  res.json({success:true,msg:req.user});
});

/*
  Permet de supprimer son compte. Cette fonction va seulement supprimer le user dans la base de donnée qui correspond au membre. Les dessins sont conservés.
*/
router.post('/unregister',passport.authenticate('local',function(req,res){
  var data = req.body;
  var User = mongoose.model('User');
  var query = User.findByIdAndRemove(req.session.userID,function(err,user){
    
  });

}));

/*
  Permet de s'inscrire en tant que membre sur le site. Cette fonction va enregistrer le nouvel utilisateur dans la base de données.
*/
router.post('/register' , function(req, res){
    var data = req.body;
    var User = mongoose.model('User');
    var newUser = new User({
      username: data.username,
      password: data.password,
      email: data.email
  })
  newUser.save(function (err){
    if (err) return console.error(err);
    console.log("User saved")
  })
res.json({success:true,msg:"You have successfully registered!"});

});



module.exports = router;