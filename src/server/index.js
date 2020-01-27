/* eslint consistent-return:0 */

const express = require('express');

const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const websocket = require('./websocket');
const mongoose = require('mongoose') //Pris
const fs = require('fs');
const app = express();
const privateKey = fs.readFileSync('/etc/letsencrypt/live/guessify.me/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/guessify.me/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/guessify.me/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
var https = require('https').createServer(credentials,app);
var io = require('socket.io')(https);
var loginRoute = require('./routes/login.js');

console.log(__dirname);

fs.readFile(__dirname+'/Dictionnaires/ENdic.txt','utf8',function(err,data){
    if(err) throw err;
    global.dictionnaire = data.toString().split("\r\n");
});

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var launchDataBase = require('./database.js');
// If you need a backend, e.g. an API, add your custom backend-specific middleware here

app.set('trust proxy', 1) // trust first proxy (autorise l'utilisation d'un proxy)
app.use(express.json());

// In production we need to pass these values in instead of relying on webpack
//Pris 
launchDataBase(app,io);

passport.serializeUser(function(user, done) {
  user.password = null
  
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    var User = mongoose.model('User');
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password.' });
      }
      user.comparePassword(password,(err,isMatch) => {
        if(err) return done(null, false, { message: err })
        if(!isMatch)  return done(null, false, { message: 'Incorrect username/password.' })
         
        return done(null, user);
    })
    });
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', loginRoute);

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
websocket.start(io);
// Start your app.
https.listen(port, function(){
  logger.appStarted(port, prettyHost);
  
});
