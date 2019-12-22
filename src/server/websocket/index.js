var mongoose = require('mongoose')
var Lobby = require("../Schema/Lobby")
var sockets = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


sockets.start = function (io) {
  const findLobby = () => {
    var arr = Array.from(io.lobby.values());
    var freeLobbies = arr.filter((lobby)=> lobby.listPlayer.size < lobby.maxPlayer);
    if (freeLobbies.length == 0) {
      lobby = new Lobby();
    io.lobby.set(lobby.id,lobby);
    }
    else {
      lobby = freeLobbies[0];
    }
    return lobby;
  
  }
  io.lobby = new Map();
  io.on('connection', function (socket) {
    socket.isInGame = false;
    socket.on('findGame', async function (username) {
      var lobby = findLobby(io);
      lobby.join(socket.id)
      socket.username = username;
      socket.lobby = lobby;
      socket.join(lobby.id);
      socket.isInGame = true;
      socket.emit("joinedGame", lobby)
        if(!lobby.started && lobby.listPlayer.size > 1)
        {
          lobby.started = true;
          lobby.drawer = lobby.listPlayer[0];
          io.to(socket.lobby.id).emit("announcement",
          "La partie va commencer!")
          await sleep(5000);
          io.to(socket.lobby.id).emit("drawer",
          lobby.drawer);

          
        }
    });
    socket.on('sendChat', async function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit("receiveChat", msg)
      if(msg == "guess")
      {
        io.to(socket.lobby.id).emit("announcement",
        socket.username+" guessed it!")
        lobby.drawer = lobby.listPlayer[1];
        await sleep(2000);
        io.to(socket.lobby.id).emit("drawer",
        lobby.drawer);
      }
      
    });

    socket.on('draw', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit('drawCmd', msg);
    });
    socket.on('requestListPlayer', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit('listPlayer', socket.lobby);
    });

    socket.on('requestListPlayer', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit('listPlayer', socket.lobby);
    });

    socket.on('disconnect', function () {
      
      if(!socket.lobby) return; 
      console.log(socket.lobby)
      io.to(socket.lobby.id).emit("announcement",
      "Someone left")
    });
    socket.on('sendWordList',function(wordlist){
      if(!socket.isInGame) return socket.emit("Unauthorized","You are not allowed send this command!");          
      io.to(socket.lobby.id).emit('receiveWordList',wordlist);
    });
  });
}

module.exports = sockets;
