const mongoose = require('mongoose')
var UserSchema = require('./User')
var LobbySchema = require('./Lobby')
var uniqid = require('uniqid');
function initModel(){
    mongoose.model('User', UserSchema);
    mongoose.model('Lobby', LobbySchema);
}

async function createLobby(){
    var Lobby = mongoose.model("Lobby")
    var lobbyID  = uniqid.time();
    var l = new Lobby({
        codeLobby: lobbyID
    })
    var result = await l.save()
    return result;
}

module.exports  =  {
    initModel,
createLobby};