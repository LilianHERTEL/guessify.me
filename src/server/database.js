/* eslint-disable linebreak-style */
/* eslint consistent-return:0 */
var model = require('./Schema');
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
function launchDataBase(app){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://guessify:pAI5v2#NQk#W@kimsufi.thomasxd24.com/guessify', {useNewUrlParser: true,useUnifiedTopology: true});
    
    var db = mongoose.connection;
    global.MongoStore = new MongoStore({ mongooseConnection: db });
			app.use(session({
			secret: 'je reflechis je prends mon temps',
			resave: false,
			saveUninitialized: true,
			store: global.MongoStore,
			cookie: { secure: false }
    }))


    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', async function() {
    model.initModel();
    var Lobby = mongoose.model("Lobby");
    var lobby = await Lobby.createLobby();
    await lobby.join("do4DIEV-3JNSH4mImClMtoj16V2Jb6LI")
    console.log(Lobby)


    });
}

module.exports = launchDataBase;