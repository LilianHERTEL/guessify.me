const express = require('express');
const uniqid = require('uniqid');
var router = express.Router();
const mongoose = require('mongoose');
var passport = require('passport')
const mailer = require('express-mailer');

mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'gmail.user@gmail.com',
    pass: 'userpass'
  }
});

router.post('/login',passport.authenticate('local'), function(req, res){
  //assigne l'utilisateur à sa session
  req.session.userID = req.user._id;
  req.session.username = req.user.username;
  res.json({success:true,msg:req.user});
});

/*
  Permet de supprimer son compte. Cette fonction va seulement supprimer le user dans la base de donnée qui correspond au membre. Les dessins sont conservés.
*/
router.post('/unregister',passport.authenticate('local'),function(req,res){
  var data = req.body;
  var User = mongoose.model('User');
  var query = User.findByIdAndRemove(req.user._id,function(err,user){
    if(!err) {
      res.json({success:true,msg:"Unregistered !"});
    }
      else res.status(401).json({success:false,msg:"Error while unregistering !"});
  });
});

/*
  Permet de s'inscrire en tant que membre sur le site. Cette fonction va enregistrer le nouvel utilisateur dans la base de données.
*/
router.post('/register' , function(req, res){
  var data = req.body;
  var User = mongoose.model('User');

  app.mailer.send('email', {
    to: 'atomicadx@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });


  var newUser = new User({
      ...data
  })
  newUser.save(function (err){
    if (err) return res.status(401).json({success:false,msg:err.errmsg});
    return res.json({success:true,msg:"You have successfully registered!"});
  })
});

router.get('/logout', function(req,res){
  req.logout();
  req.session.userID=null;
  res.json({success:true,msg:"Logout sucessfull!"});
});


module.exports = router;