/* eslint-disable global-require */
var Lobby = require('./Lobby');
/**
 * Handles all the connections and lobbies
 *
 * @class LobbyHandler
 */
class LobbyHandler {
/**
 *Creates an instance of LobbyHandler.
    * @param {*} httpServer
    * @memberof LobbyHandler
    */
  constructor(httpServer) {
    this.lobbies = new Map();
    this.io = require('socket.io')(httpServer);
    this.initConnect();
  }

  /**
     *
     *
     * @returns {Lobby} lobby
     * @memberof LobbyHandler
     */
  findLobby() {
    const arr = Array.from(this.lobbies.values());
    const freeLobbies = arr.filter(lobby => lobby.listPlayer.length < lobby.maxPlayer);
    let lobby;
    if (freeLobbies.length == 0) {
      lobby = new Lobby(this,"en-US");
      this.lobbies.set(lobby.id, lobby);
    } else {
      [lobby] = freeLobbies;
    }
    return lobby;
  }


  initConnect() {
    const handler = this;

    this.io.on('connection', (player) => {
      player.on('findGame', (username) => {
        player.lobby = handler.findLobby();
        player.lobby.addPlayer(player,username);
        player.lobby.registerEvents(player);
        
      });
    });
  }
}

module.exports = LobbyHandler;