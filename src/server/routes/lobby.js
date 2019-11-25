const express = require('express');
const uniqid = require('uniqid');
var router = express.Router();
const mongoose = require('mongoose');

router.get('/create', function(req, res){
    var id = uniqid().substr(9,11);
    
    res.send(id);
  });

router.get('/list' , function(req, res){
  
res.json({hi:"hi"});

});
/*
router.get('/leave', function(req,res){
  req.
  res.redirect('/home')
})
*/

module.exports = router;