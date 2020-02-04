var mongoose = require('mongoose')
var Lobby = require("../Schema/Lobby")
var sockets = {};
var Dictionnary = require("../GestionMots/Envoiemot");
var Algo = require("../util/levestein")
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


sockets.start = function (io) {
  const findLobby = () => {
    var arr = Array.from(io.lobby.values());
    var freeLobbies = arr.filter((lobby)=> lobby.listPlayer.length < lobby.maxPlayer);
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
      lobby.join(socket.id,username)
      socket.username = username;
      socket.lobby = lobby;
      socket.join(lobby.id);
      socket.isInGame = true;
      socket.emit("joinedGame", {lobby})
      io.to(socket.lobby.id).emit("updateLobby", {lobby,listPlayer: lobby.listPlayer})
     io.to(socket.lobby.id).emit("announcement", socket.username + " joined the lobby")
        if(!lobby.started && lobby.listPlayer.length > 1)
        {
          lobby.started = true;
          lobby.getNextDrawer();
          io.to(socket.lobby.id).emit("announcement",
          "La partie va commencer!")
          await sleep(2000);
          io.to(socket.lobby.id).emit("drawer",
          lobby.currentDrawer);
          lobby.currentWord = Dictionnary.tirerMots();
          io.to(lobby.currentDrawer.socketID).emit("wordToBeDrawn",lobby.currentWord);
          
          
        }
    });
    socket.on('sendChat', async function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit("receiveChat", msg)
      if(Algo.calculateLev(msg,socket.lobby.currentWord) < 3)
      {
        io.to(socket.lobby.id).emit("announcement",
        socket.username+" guessed it!")
        lobby.addPoint(socket.id,1);
        io.to(socket.lobby.id).emit("updateLobby", {lobby,listPlayer: lobby.listPlayer})
        lobby.getNextDrawer();
        await sleep(2000);
        io.to(socket.lobby.id).emit("drawer",
          lobby.currentDrawer);
          lobby.currentWord = Dictionnary.tirerMots();
          io.to(lobby.currentDrawer.socketID).emit("wordToBeDrawn",lobby.currentWord);

      }
      
    });

    socket.on('draw', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit('drawCmd', msg);
    });

    socket.on('clearDrawing', function (msg) {
      if (!socket.isInGame) return socket.emit("Unauthorized", "You are not allowed send this command!");
      io.to(socket.lobby.id).emit('clearDrawing', msg);
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
      socket.lobby.leave(socket.id)

      io.to(socket.lobby.id).emit("announcement",
      "Someone left")
      io.to(socket.lobby.id).emit("updateLobby",
      {lobby:socket.lobby,listPlayer: socket.lobby.listPlayer})
      if(socket.lobby.listPlayer.length < 2)
      {
        io.to(socket.lobby.id).emit("announcement",
        "Not enough players! Gmae resetted. Waiting for a second player...")
        socket.lobby.resetGame();
      }
    });
   
    socket.on('sendWordList',function(wordlist){
      if(!socket.isInGame) return socket.emit("Unauthorized","You are not allowed send this command!");          
      io.to(socket.lobby.id).emit('receiveWordList',wordlist);
    });

    socket.on('drawingSideOption',function(option){
      if(!socket.isInGame) return socket.emit("Unauthorized","You are not allowed send this command!");          
      io.to(socket.lobby.id).emit('viewerSideOption',option);
      console.log(JSON.stringify(option));
    });
  });
}

module.exports = sockets;
