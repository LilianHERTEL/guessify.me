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
      ...data
  })
  newUser.save(function (err){
    if (err) return res.json({success:false,msg:err.errmsg});
    return res.json({success:true,msg:"You have successfully registered!"});
  })


});



module.exports = router;