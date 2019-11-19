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


  
  module.exports =  UserSchema