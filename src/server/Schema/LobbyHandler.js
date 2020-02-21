const Lobby = require("./Lobby")
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
        this.io = require('socket.io')(httpServer)
        this.io.use((socket, next) => {
            let clientId = socket.handshake.headers['x-clientid'];
            console.log(clientId)
            return next();
        });
        this.initConnect()


    }

    /**
     *
     *
     * @returns {Lobby} lobby
     * @memberof LobbyHandler
     */
    findLobby() {
        var arr = Array.from(this.lobbies.values());
        var freeLobbies = arr.filter((lobby) => lobby.listPlayer.length < lobby.maxPlayer);
        if (freeLobbies.length == 0) {
            lobby = new Lobby();
            io.lobby.set(lobby.id, lobby);
        }
        else {
            lobby = freeLobbies[0];
        }
        return lobby;

    }

    

    initConnect() {
        let handler = this
        
        this.io.on("connection", function (player) {
            player.on("findGame", function () {
                player.lobby = handler.findLobby();
                player.lobby.registerListener(player);
                player.lobby.addPlayer(player)


            })

        })

    }



}