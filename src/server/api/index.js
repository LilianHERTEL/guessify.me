const express = require('express');
const uniqid = require('uniqid')
var router = express.Router()

router.get('/lobby/create', function(req, res){
    var id = uniqid().substr(9,11);
    global.roomList[id] = {id:id,user:[]};
    res.send(id);
  });

router.get('/lobby/listhi' , function(req, res){
  console.log(req.session)
  if(!req.session.count) req.session.count=0;
  
  req.session.count++
  console.log(req.session)
res.json({hi:"hi"});
});

module.exports = router;