var mongoose = require('mongoose')
var sockets = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const findLobby = async (username,socket) => {
  var Lobby = mongoose.model("Lobby");
  var lobbyResult = await Lobby.aggregate([{
    $project: {
      cmp_value: { $cmp: ['$maxPlayer', { $size: '$listPlayer' }] }
    }
  },
  { $match: { cmp_value: { $gt: 0 } } }]).exec();
  var lobby;
  if (lobbyResult.length == 0) {
    lobby = await Lobby.createLobby(socket);
  }
  else {
    lobby = await Lobby.findOne({ _id: lobbyResult[0] }).exec()
  }
  await lobby.join(socket.id, username);
  await lobby.save();

  return lobby;

}
sockets.start = function (io) {
  io.on('connection', function (socket) {
    socket.isInGame = false;
    socket.on('findGame', async function (username) {
      var lobby = await findLobby(username,socket);
      socket.username = username;
      socket.lobby = lobby
      socket.join(lobby._id.toString());
      socket.isInGame = true;
     
      socket.emit("joinedGame",
        lobby)
        if(!lobby.started && lobby.listPlayer.length > 4)
        {
          lobby.started = true;
          lobby.drawer = lobby.listPlayer[0];
          io.to(socket.lobby._id).emit("announcement",
          "La partie va commencer!")
          await sleep(5000);
          io.to(socket.lobby._id).emit("drawer",
          lobby.drawer);

          
        }
    });
    socket.on('sendChat', async function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby._id).emit("receiveChat", msg)
      if(msg == "guess")
      {
        io.to(socket.lobby._id).emit("announcement",
        socket.username+" guessed it!")
        lobby.drawer = lobby.listPlayer[1];
        await sleep(2000);
        io.to(socket.lobby._id).emit("drawer",
        lobby.drawer);
      }
      
    });

    socket.on('draw', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby._id).emit('drawCmd', msg);
    });
    socket.on('requestListPlayer', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby._id).emit('listPlayer', socket.lobby);
    });

    socket.on('requestListPlayer', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby._id).emit('listPlayer', socket.lobby);
    });
  });
}

module.exports = sockets;