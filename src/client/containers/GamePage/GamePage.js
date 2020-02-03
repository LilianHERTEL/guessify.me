/*
* GamePage
*
* List all the features
*/
import React, { useState, useEffect, useReducer } from 'react';
import './style.css';
import { Box, LinearProgress, Typography, Grid } from '@material-ui/core';
import Chat from './Chat'
import openSocket from 'socket.io-client';
import Leaderboard from './LeaderBoardV2.js';
import RenderAreaV2 from './RenderAreaV2';
import { Redirect } from 'react-router-dom';
import DrawerArea from './DrawerArea';
import MyPath from './MyPath';


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

var socket;

var pathsArray = [];
class Point { x = 0; y = 0; }
var isRendering = false;
var isDrawing = false;

/*****************************
 * THE COMPONENT STARTS HERE *
 * ***************************/
const GamePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [chatArray, setChat] = useState([]);
  const [listPlayer, setListPlayer] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentDrawerName, setCurrentDrawerName] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  //drawing rendering :
  const [listPath, setListPath] = React.useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const fctQuiAjouteUnParUn = (myPath) => {

    var { x, y } = myPath.points.shift();
    setListPath(listpath => {
      if (listpath.length === 0) return [];
      listpath[listpath.length - 1].points.push({ x, y });
      return listpath;
    });
    forceUpdate();

  }

  const displayPathsArray = async () => {
    isRendering = true;
    while (pathsArray.length > 0) {
      let time = pathsArray[0].time;
      let nbPoints = pathsArray[0].points.length;
      for (var i = 0; i < nbPoints; i++) {
        fctQuiAjouteUnParUn(pathsArray[0]);

        await sleep((time * 1000) / nbPoints);

      }
      pathsArray.shift();
    }
    isRendering = false;
  }

  const connect = (username) => {
    socket.on('connect', function () {
      socket.emit("findGame", username)
    });
    socket.on('Unauthorized', function (data) {
      console.error(data)
    });
    socket.on('joinedGame', function (data) {
      setChat(chat => [...chat, "Connected to Lobby " + data.lobby.id])
    });
    socket.on('updateLobby', function (data) {
      setListPlayer(data.listPlayer)
    });
    socket.on('receiveChat', function (data) {
      setChat(chat => [...chat, data])
    });
    socket.on('announcement', function (data) {
      setChat(chat => [...chat, data])
    });
    socket.on('draw', function (data) {
      setChat(chat => [...chat, data])
    });
    socket.on('wordToBeDrawn', function (data) {
      setChat(chat => [...chat, "The word is " + data + " !"])
      setCurrentWord(data);
    });
    socket.on('drawer', function (data) {
      setChat(chat => [...chat, data.username + " is drawing!"])
      setCurrentDrawerName(data.username);
      isDrawing = data.socketID == socket.id;
      setDrawing(data.socketID == socket.id);
      //On vide la listPath à chaque fois 
      setListPath([]);
    });
    socket.on('drawCmd', async function (data) {
      if (drawing) return;
      pathsArray = [...pathsArray, data];
      console.log("//////// VIEWER DATA : " + JSON.stringify(data));
      setListPath(path => {
        if (path.length == 0 || path[path.length - 1].id != data.id) {
          if (path.length != 0) console.log("adding new Path : " + path[path.length - 1].id + " : " + data.id);
          return [...path, new MyPath([], data.color, data.thickness, data.time, data.id)];

        }
        else {
          console.log("NOT adding new Path : " + path[path.length - 1].id + " : " + data.id);
          return [...path];

        }
      });

      if (!isRendering)
        await displayPathsArray();
      else
        console.log("IS RENDERING : TRUE");
    });
    socket.on('clearDrawing', () => {
      console.log("CLEARING DrawingRenderArea");
      setListPath([]);
    });
    socket.on('disconnect', function () { });
  }

  useEffect(() => {
    if (!props.location.state) return;
    if (window.location.hostname == "guessify.me")
      socket = openSocket('http://guessify.me/');
    else
      socket = openSocket('http://' + window.location.hostname + ':8880/');
    connect(props.location.state.username);

  }, []);

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value == "") return
      socket.emit("sendChat", e.target.value)
      e.target.value = ""
    }
  }

  if (!props.location.state)
    return (<Redirect to="/" />)

  function Underscored_Word() {
    let underscored_word = "";
    for (let i = 0; i < currentWord.length; i++) {
      underscored_word += "_ ";
    }
    return (
      <Typography variant="h4" align="center">{underscored_word}</Typography>
    );
  }

  function TurnInfo(props) {
    return (
      <Box mb={1} className="fullWidth">
        <Box display="flex" justifyContent="center">
        <Typography variant="h5" align="center">{currentDrawerName} is drawing...</Typography>
        <Box ml={2}>
          <Underscored_Word />
        </Box>
        </Box>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box height={1} padding={2} >
      <Grid container spacing={1} className="fullHeight">
        <Grid item md={9} xs={12}>
          <Box display="flex" height={1} flexDirection="column" flexGrow={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              {
                currentWord == null ? null : <TurnInfo />
              }
            </Box>
            <Box>
              {
                drawing ?
                  ( // drawer view
                    <DrawerArea socket={socket} />
                  ) :
                  ( // guesser view
                    <Box id="svgArea">
                      <RenderAreaV2 listPath={listPath} />
                    </Box>
                  )
              }
            </Box>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Box display="flex" height={1} flexDirection="column">
            <Leaderboard listPlayer={listPlayer} />
            <Box mt={1} />
            <Chat chat={chatArray} enterKey={_handleKeyDown} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamePage;