function start(io) {

    io.on('connection', function(socket){
      socket.on('findGame', function(){
        
      });
        socket.on('sendChat', function(msg){
          io.to(curretRoom).emit("receiveChat",msg)
        });
        socket.on('requestLobbyList', function(user){
          socket.emit("list",global.roomList)
        });

        socket.on('draw', function(msg){
          io.to(curretRoom).emit('drawCmd', msg);
        });
      });
}

module.exports.start = start;