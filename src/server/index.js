/* eslint consistent-return:0 */

const express = require('express');

const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const websocket = require('./websocket');
const mongoose = require('mongoose') //Pris
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var api = require('./api');

var launchDataBase = require('./database.js');

global.roomList = {};
// If you need a backend, e.g. an API, add your custom backend-specific middleware here

app.set('trust proxy', 1) // trust first proxy (autorise l'utilisation d'un proxy)


// In production we need to pass these values in instead of relying on webpack
//Pris 
launchDataBase(app);

app.use('/api', api);
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
websocket.start(io);
// Start your app.
http.listen(port, function(){
  logger.appStarted(port, prettyHost);
  
});
