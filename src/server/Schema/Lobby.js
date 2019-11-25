var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    typeConnexion:String,
    tokemTMP: String
})

  var UserSchema = new Schema({
    userID:  Number,
    username: String,
    passwordHash:   String,
    profileImageURL:   String,
    isAdmin: Boolean,
    email: String,
    inGame: Boolean,
    pointTotal: Number,
    listCo: [MoyenConnexionSchema]
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

  
  
  module.exports =  UserSchema