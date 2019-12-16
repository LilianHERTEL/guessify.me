var mongoose = require('mongoose');
var uniqid = require('uniqid')
  var Schema = mongoose.Schema;

  var PlayerSchema = Schema({
    socketID : String,
    username : String,
    pointsTotal    : Number,
  });

  var LobbySchema = new Schema({
    codeLobby:  String,
    theme: String,
    maxPlayer: {type: Number, default:10},
    isPrivate:   Boolean,
    isActive:   Boolean,
    status: String,
    joinable: Boolean,
    inGame: Boolean,
    listPlayer: [PlayerSchema]
  });

class Lobby {


  async join(socketID,username){
    this.listPlayer.push({
      socketID,
      username,
      pointsTotal : 0
    })
    await this.save();
  }

  static async createLobby(socket){
    var Lobby = this.model("Lobby");
    var lobbyID  = uniqid.time();
    var l = new Lobby({
        codeLobby: lobbyID
    })
    var result = await l.save()
    this.socket = socket;
    return result;
  }
}

  LobbySchema.loadClass(Lobby)
  LobbySchema.methods.leave = async function (session) {
    
    var pos = this.listPlayer.findIndex(element => element.session === session);
    this.listPlayer.splice(pos,1);
    await this.save();
  }
  
  module.exports =  LobbySchema