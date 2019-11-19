/* eslint consistent-return:0 */

const express = require('express');

const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const websocket = require('./websocket');
const mongoose = require('mongoose')
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var api = require('./api');
var initDatabase = require('./Schema')
global.roomList = {};
// If you need a backend, e.g. an API, add your custom backend-specific middleware here

var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
app.set('trust proxy', 1) // trust first proxy

mongoose.connect('mongodb://guessify:pAI5v2#NQk#W@10.8.0.1/guessify', {useNewUrlParser: true,useUnifiedTopology: true});

// In production we need to pass these values in instead of relying on webpack
var db = mongoose.connection;
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db }),
  cookie: { secure: false }
}))
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  initDatabase();
  var User = mongoose.model('User');
});
app.use('/api', api)
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
websocket.start(io);
// Start your app.
http.listen(port, function(){
  logger.appStarted(port, prettyHost);
  
});
