var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uniqid = require('uniqid');
var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get('/room/:id', function(req, res){
  res.render('index.ejs',{id:req.params.id});
});

app.get('/createLobby', function(req, res){
  var id = uniqid('room-');
  roomList.set(id,{id:id,user:[]})
  res.send(id);
});
var roomList = new Map();

io.on('connection', function(socket){
  var connected = false;
  var curretRoom = null;
  socket.on('initConnection', function(user){
    socket.user = user;
    connected = true;
  });
  socket.on('joinRoom', function(room){
    var room = roomList.get(room);
    if(!room)
    {
      // socket.emit('error','Room not found');
      return;
    }
    curretRoom = room.id;
    room.user.push(socket.user)
    socket.emit('joinedRoom',room);
    socket.join(curretRoom);
    connected = true;
  });
  socket.on('draw', function(msg){
    io.to(curretRoom).emit('drawCmd', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
