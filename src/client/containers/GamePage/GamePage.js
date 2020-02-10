/*
* GamePage
*
* List all the features
*/
import React, { useState, useEffect, useReducer, useRef } from 'react';
import './style.css';
import { Box, LinearProgress, Typography, Grid, withStyles, lighten, useTheme, useMediaQuery } from '@material-ui/core';
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
var interval;
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
  const [order, setOrder] = useState("...");
  const [currentWord, setCurrentWord] = useState(null);
  const [progressBarValue, setProgressBarValue] = useState(0);
  //drawing rendering :
  const [listPath, setListPath] = React.useState([]);
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const sockid = useRef(null);
  const startTimer = (time) => {
    if(interval != null)
    
    {
      clearInterval(interval);
      interval = null;
    }
    var curTime = time * 10;
    interval = setInterval(() => {
      var percent = curTime / (time * 10) * 100
      setProgressBarValue(percent)
      curTime--
      if (curTime == 0) 
      {
        clearInterval(interval)
        interval = null;
      }
      
    }, 100)
  }
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const fctQuiAjouteUnParUn = (myPath) => {

    var { x, y } = myPath.points.shift();
    setListPath(listpath => {
      if (listpath.length === 0) return [];
      var pathTMP = (listpath.find((path) => path.id === myPath.id));
      if(pathTMP != undefined) pathTMP.points.push({ x, y });
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
    socket.on('startTimer', function (time) {
      startTimer(time)
    });
    socket.on('joinedGame', function (data) {

      setChat(chat => [...chat, (<Typography variant="button" align="center" display="block">Connected to Lobby {data.lobby.id}</Typography>)])
      sockid.current = socket.id;
    });
    socket.on('updateLobby', function (data) {
      setListPlayer(data.listPlayer);
      var PlayerOrder = data.listPlayer.find(e => e.socketID === socket.id);
      setOrder(PlayerOrder ? PlayerOrder.order : "...");
    });
    socket.on('receiveChat', function (username, msg) {
      setChat(chat => [...chat, (<Typography variant="body2"><b>{username}</b> : {msg}</Typography>)])
    });
    socket.on('guessedPlayer', function (username) {
      setChat(chat => [...chat, (<Typography variant="body2" style={{color:"green"}}><b>{username}</b> guessed the word!</Typography>)])
    });
    socket.on('announcement', function (data) {
      setChat(chat => [...chat, (<Typography variant="subtitle2" align="center" display="block">{data}</Typography>)])
    });
    socket.on('closeGuess', function (data) {
      setChat(chat => [...chat, (<Typography variant="subtitle2" display="block" color="secondary">Your guess was close!</Typography>)])
    });
    socket.on('notAllowedToEnterAnswer', function (data) {
      setChat(chat => [...chat, (<Typography variant="subtitle2" display="block" color="error">You are not allowed to enter the answer!</Typography>)])
    });
    socket.on('peopleJoin', function (username) {
      setChat(chat => [...chat, (<Typography variant="overline" align="center" display="block"><b>{username}</b> joined the lobby</Typography>)])
    });
    socket.on('draw', function (data) {
      setChat(chat => [...chat, data])
    });
    socket.on('wordToBeDrawn', function (data) {
      setChat(chat => [...chat, (<Typography variant="body2" align="center" display="block">The word is <b>{data}</b>!</Typography>)])
      console.log("RECEIVED word");
      setCurrentWord(data);
    });
    socket.on('wordToBeDrawn_Underscored', function (data) {
      console.log("RECEIVED _ _ _");
      setCurrentWord(data);
    });
    socket.on('drawer', function (data) {
      socket.emit('requestListPlayer', null);
      setChat(chat => [...chat, (<Typography variant="overline" align="center" display="block"><b>{data.username}</b> is drawing!</Typography>)])
      setCurrentDrawerName(data.username);
      isDrawing = data.socketID == socket.id;
      setDrawing(data.socketID == socket.id);
      //On vide la listPath à chaque fois 
      setListPath([]);
    });
    socket.on('drawCmd', async function (data) {
      if (drawing) return;
      pathsArray = [...pathsArray, data];
      console.log("//////// VIEWER DATA : " + JSON.stringify(data.id));
      setListPath(path => {
        if (path.length == 0 || path[path.length - 1].id != data.id) {
          //if (path.length != 0) console.log("adding new Path : " + path[path.length - 1].id + " : " + data.id);
          return [...path, new MyPath([], data.color, data.thickness, data.time, data.id)];
        }
        else {
          //console.log("NOT adding new Path : " + path[path.length - 1].id + " : " + data.id);
          return [...path];
        }
      });

      if (!isRendering)
        await displayPathsArray();
      // else
      //   //console.log("IS RENDERING : TRUE");
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

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      marginTop: 5,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);
  

  /**
   * The components that displays the name of the drawer and the hidden word, or the full word for the drawer
   */
  function TurnInfo() {
    if (currentWord == null)
      return (
        <Typography variant="h5" align="center">Waiting for other players...</Typography>
      );
    return (
      <Box display="flex" justifyContent="space-evenly">
        {
          currentWord.charAt(0) == "_" ?
            <React.Fragment>
              <Box display="flex" flexDirection="row">
                <Typography variant="h5" align="center" color="primary">{currentDrawerName}</Typography>
                <Box mr={1} />
                <Typography variant="h5" align="center">is drawing...</Typography>
              </Box>
              <Typography variant="h5" align="center">{currentWord}</Typography>
            </React.Fragment>
            :
            <Typography variant="h5" align="center">It's your turn ! The word is "{currentWord}"</Typography>
        }
      </Box>
    );
  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const handleSocketClose = () => {
    console.log("Closing socket");
    socket.disconnect();
  };

  return (
    <Box height={1} padding={2} >
      <Grid container spacing={1} className="fullHeight">
        <Grid item md={9} xs={12}>
          <Box display="flex" height={1} flexDirection="column" flexGrow={4}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box mb={1} className="fullWidth">
                <TurnInfo />
                <BorderLinearProgress
                  variant="determinate"
                  color="primary"
                  value={progressBarValue}
                />
              </Box>


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
          <Box display="flex" height={1} flexDirection={matches ? "column" : "column-reverse"}>
            <Leaderboard listPlayer={listPlayer} order={order} handleSocketClose={handleSocketClose} />
            <Box mt={1} />
            <Chat chat={chatArray} enterKey={_handleKeyDown} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GamePage;