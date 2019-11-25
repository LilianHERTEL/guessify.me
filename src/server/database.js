/* eslint-disable linebreak-style */
/* eslint consistent-return:0 */
var model = require('./Schema');
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
function launchDataBase(app){
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://guessify:pAI5v2#NQk#W@kimsufi.thomasxd24.com/guessify', {useNewUrlParser: true,useUnifiedTopology: true});

    var db = mongoose.connection;
			app.use(session({
			secret: 'je reflechis je prends mon temps',
			resave: false,
			saveUninitialized: true,
			store: new MongoStore({ mongooseConnection: db }),
			cookie: { secure: false }
    }))


    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    model.initModel();
    model.createLobby();
    });
}

module.exports = launchDataBase;