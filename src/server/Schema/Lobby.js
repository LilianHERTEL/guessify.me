
var uniqid = require('uniqid')

class Lobby {
  constructor(handler) {
    this.id = uniqid();
    this.maxPlayer = 10;
    this.inGame = false;
    this.listPlayer = [];
    this.guessedPlayer = [];
    this.started = false;
    this.currentDrawer = null;
    this.timer = null;
    this.handler = handler;
  }
  // Socket related command
  emitAll(event, data) {
    io.to(socket.lobby.id).emit(event, data)
  }

  emitAllExceptSender(event, data) {
    io.to(socket.lobby.id).emit(event, data)
  }


  startGame() {
    this.started = true;
    this.emitAll("announcement", "The game will start in 5 seconds!")
    this.startTimer(5)
  }

  postRound() {
    this.emitAll("announcement", "The word was : " + socket.lobby.currentWord);
    socket.lobby.clearGuessedPlayer()
  }

  preRound() {
    this.getNextDrawer();
    this.emitAll("updateLobby", { lobby, listPlayer: lobby.listPlayer }); //SLIME MARK
    this.emitAll("drawer", socket.lobby.currentDrawer);
    this.currentWord = Dictionnary.tirerMots("fr-FR"); //TO-DO make 3 choices
    this.io.emit("wordToBeDrawn_Underscored", Dictionnary.underscoreWordToBeDrawn(socket.lobby.currentWord));

    //sends the full word only to the drawer
    io.to(socket.lobby.currentDrawer.socketID).emit("wordToBeDrawn", socket.lobby.currentWord);
    io.to(socket.lobby.id).emit("announcement", "You have 2 minutes to guess the word!");
    this.startTimer(120)


  }

  shortenTime(time) {
    this.emitAll.emit("announcement", "Time shortened to " + time + " seconds");
    this.emitAll.emit("startTimer", time);
    this.startTimer(time)
  }

  addGuessedPlayer(player) {
    this.emitAll("guessedPlayer", player.username)
    socket.lobby.addPoint(socket.id, 1);
    this.guessedPlayer.push(player);
    io.to(socket.lobby.id).emit("updateLobby", { lobby, listPlayer: lobby.listPlayer });

    this.shortenTime(15) // TO-DO add condition when the main timer is < 15
  }

  sendChat(player, msg) {
    // Guessed player sending the answer or Drawing player typing anything
    if ((msg == this.currentWord && this.containsGuessedPlayer(player)) || player == socket.lobby.currentDrawer)
      return player.emit("notAllowedToEnterAnswer");

    if (!socket.lobby.started) return this.emitAll("receiveChat", socket.username, msg);

    //Testing similarity
    if (Algo.compareString(msg, socket.lobby.currentWord) > 0.8 && msg != socket.lobby.currentWord)
      socket.emit("closeGuess");

    if (msg == this.currentWord && !this.containsGuessedPlayer(player) && player != this.currentDrawer)
      this.addGuessedPlayer(player)
    else
      this.emitAll("receiveChat", socket.username, msg)
  }

  startTimer(time, callback) {
    this.emitAll("startTimer", time);
    clearTimeout(this.timer)
    this.timer = setTimeout(callback, time);
  }

  goNextTurn() {
    this.postRound()
    // Changement d'un round
    if (this.listPlayer.length <= 1) return this.resetGame();
    this.preRound()

  }

  startTurn() {
    if (this.listPlayer.length <= 1) return this.resetGame();
    this.preRound()
  }

  addPlayer(player) {
    this.listPlayer.push(player);
    player.join(lobby.id);
    player.isInGame = true;
    player.emit("joinedGame", { lobby })
    io.to(player.lobby.id).emit("updateLobby", { lobby, listPlayer: this.lobby.listPlayer })
    io.to(player.lobby.id).emit("peopleJoin", socket.username)
    this..lobby.verifyStartable();
  }

  containsGuessedPlayer(socketID) {
    return this.guessedPlayer.includes(socketID);
  }

  verifyStartable() {
    if (this.started || lobby.listPlayer.length <= 1) return; // Lobby not startable
    lobby.started = true;

    this.emitAll("announcement",
      "The game will start in 5 seconds!")
    this.startTimer(5, this.startTurn);
    ;

  }


  registerEvents(player) {
    

  }


  clearGuessedPlayer() {
    this.guessedPlayer = []
  }

  /**
   * Permet de réinitialiser un lobby
   */
  resetGame() {
    this.started = false;
    this.currentDrawer = null;
    this.currentDrawerIndex = null;
  }

  /**
   * Permet de passer au dessinateur suivant.
   */
  getNextDrawer() {
    if (this.currentDrawer == null) {
      this.currentDrawer = this.listPlayer[0];
      this.currentDrawerIndex = 0;
      return;
    } else {

      this.listPlayer.forEach((e, index) => {
        e.order -= 1;
      });
      this.currentDrawer.order = this.listPlayer.length - 1;
      this.currentDrawer = this.listPlayer.find(e => e.order === 0);
    }
  }


  disconnectPlayer(player) {
    if (!socket.lobby) return;
    this.leave(player)
    io.to(socket.lobby.id).emit("disconnectPlayer", "socket.username")
    io.to(socket.lobby.id).emit("updateLobby",
        { lobby: socket.lobby, listPlayer: socket.lobby.listPlayer })
    if (socket.lobby.listPlayer.length < 2) {
        io.to(socket.lobby.id).emit("announcement",
            "Not enough players! Game resetted. Waiting for a second player...");
        socket.lobby.resetGame();
        return;
    }
    if (socket.id == socket.lobby.currentDrawer.socketID) goNextTurn(io, socket)
}




  /**
   * Removes a player from the listPlayer, returns true if success, false otherwise
   *
   * @param {SocketIO.Socket} player
   * @returns boolean
   * @memberof Lobby
   */
  leave(player) {
    var index = this.getPlayerPos(player)
    if (index > -1) {
      this.listPlayer.splice(index, 1);
      return true;
    }
    return false;
  }

  getPlayerPos(player) {
    return this.listPlayer.map(function (p) { return p.id; }).indexOf(player.id)
  }

  /**
   * Permet d'ajouter des points au joueur possèdant le socketID, fonction appelé exclusivement par le serveur, sous réserve de victoire.
   * @param {} socketID 
   * @param {int} point : le nombre de points à ajouter
   */
  addPoint(socketID, point) {
    for (const player of this.listPlayer) {
      if (player.socketID == socketID) {
        player.pointsTotal++;
      }
    }
  }
}



module.exports = Lobby;