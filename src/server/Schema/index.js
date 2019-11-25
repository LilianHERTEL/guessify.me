const mongoose = require('mongoose')
var UserSchema = require('./User')
var LobbySchema = require('./Lobby')
var uniqid = require('uniqid');
function initModel(){
    mongoose.model('User', UserSchema);
    mongoose.model('Lobby', LobbySchema);
}

module.exports  =  {
    initModel
};