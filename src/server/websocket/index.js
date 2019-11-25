var mongoose = require('mongoose')
function start(io) {

    io.on('connection', function(socket){
      socket.isInGame = false;
      socket.on('findGame', async function(sessionID,username){
        var Lobby = mongoose.model("Lobby");
        var lobby = await Lobby.createLobby();
        socket.username = sessionID;
        socket.sessionID = username;
        socket.lobby = lobby
        await lobby.join(sessionID,username);
        socket.join(lobby._id.toString());
        socket.isInGame = true;
        socket.emit("joinedGame",
        {
          lobby: lobby
        })
      });
        socket.on('sendChat', function(msg){
          if(!socket.isInGame) return socket.emit("Unauthorized","You are not allowed send this command!");
          io.to(socket.lobby._id).emit("receiveChat",msg)
        });

        socket.on('draw', function(msg){
          if(!socket.isInGame) return socket.emit("Unauthorized","You are not allowed send this command!");
          io.to(socket.lobby._id).emit('drawCmd', msg);
        });
      });
}

module.exports.start = start;