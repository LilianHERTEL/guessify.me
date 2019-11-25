var mongoose = require('mongoose');
var uniqid = require('uniqid')
  var Schema = mongoose.Schema;

  var PlayerSchema = Schema({
    session : { type: Schema.Types.ObjectId, ref: 'Session' },
    pointsTotal    : Number,
  });

  var LobbySchema = new Schema({
    codeLobby:  String,
    theme: String,
    isPrivate:   Boolean,
    isActive:   Boolean,
    status: String,
    joinable: Boolean,
    inGame: Boolean,
    listPlayer: [PlayerSchema]
  });

  LobbySchema.statics.createLobby = async function () {
    var Lobby = this.model("Lobby");
    var lobbyID  = uniqid.time();
    var l = new Lobby({
        codeLobby: lobbyID
    })
    var result = await l.save()
    return result;
  }

  LobbySchema.methods.join = async function (sessionID) {
    var currentSession = await global.MongoStore.get(sessionID,function (err,data) {
      console.log(data)
    })
    // l.listPlayer.push({
    //   session
    // })

  }


  LobbySchema.methods.join = async function (sessionID) {
    var currentSession = await global.MongoStore.get(sessionID,function (err,data) {
      console.log(data)
    })
    // l.listPlayer.push({
    //   session
    // })

  }

  
  
  module.exports =  LobbySchema