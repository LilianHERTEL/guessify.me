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