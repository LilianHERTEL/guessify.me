const express = require('express');
const uniqid = require('uniqid')
var router = express.Router()

router.get('/lobby/create', function(req, res){
    var id = uniqid().substr(9,11);
    global.roomList[id] = {id:id,user:[]};
    res.send(id);
  });

router.get('/lobby/list', function(req, res){
res.json(global.roomList);
});

module.exports = router;