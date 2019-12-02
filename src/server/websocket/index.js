var mongoose = require('mongoose')
function start(io) {
  console.log("bitchstart")
    io.on('connection', function(socket){
      socket.isInGame = false;
      console.log("bitch")
      socket.on('findGame', async function(sessionID,username){
        var Lobby = mongoose.model("Lobby");
        
        var lobbyResult = await Lobby.aggregate([{$project: {
          cmp_value: {$cmp: ['$maxPlayer', { $size: '$listPlayer' }]}
      }},
      {$match: {cmp_value: {$gt: 0}}}]).exec();
      var lobby;
      if(lobbyResult.length == 0)
      {
        lobby = await Lobby.createLobby();
      }
      else{
        lobby = await Lobby.findOne({_id:lobbyResult[0]}).exec()
      }
      console.log(lobby)
        socket.username = username;
        socket.sessionID = sessionID;
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
      console.log("inited")
}

module.exports.start = start;