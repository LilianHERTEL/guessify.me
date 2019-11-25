var mongoose = require('mongoose');
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


  
  module.exports =  LobbySchema