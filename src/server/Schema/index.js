const mongoose = require('mongoose')
var UserSchema = require('./User')
function initModel(){
    var User = mongoose.model('User', UserSchema);
    
}

module.exports  =  initModel;