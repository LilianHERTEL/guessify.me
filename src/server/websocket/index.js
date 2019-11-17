function start(io) {
    io.on('connection', function(socket){
        var connected = false;
        var curretRoom = null;
        socket.on('initConnection', function(user){
          socket.user = user;
          connected = true;
        });
        socket.on('sendChat', function(msg){
          io.to(curretRoom).emit("receiveChat",msg)
        });
        socket.on('requestLobbyList', function(user){
          socket.emit("list",global.roomList)
        });
        socket.on('joinRoom', function(room){
          var room = global.roomList[room];
          if(!room) 
          {
            socket.emit("errorUser","Room not found")
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
}

module.exports.start = start;