/*
* GamePage
*
* List all the features
*/
import React, { useState, useRef, useEffect,useReducer } from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Toolbar, IconButton, Menu, MenuItem, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chat from './Chat'
import openSocket from 'socket.io-client';
import DrawingArea from './DrawingArea';
import RenderAreaV2 from './RenderAreaV2';
import { Redirect } from 'react-router-dom';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { array } from 'prop-types';
import DrawingTools from './DrawingTools';
import DrawerArea from './DrawerArea';
import blue from '@material-ui/core/colors/blue';
import MyPath from './MyPath';

var socket;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function PlayerList(props) {
  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.username} secondary={props.score + " points"} />
        <ListItemSecondaryAction>
          #{props.index + 1}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
}

var pathsArray = [];
class Point { x = 0; y = 0; }
var isRendering = false;

/*****************************
 * THE COMPONENT STARTS HERE *
 * ***************************/
const GamePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [lobby, setLobby] = useState(null);
  const [chatArray, setChat] = useState([]);
  const [chatDisplayed, setChatDisplayed] = useState(null);
  const [LeaderboardDisplayed, setLeaderboardDisplayed] = useState(null);
  const [listPlayer, setListPlayer] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [currentDrawerName, setCurrentDrawerName] = useState(null);
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


  /************************************
   * Chat handlers  
   */
  const handleChatClick = event => {
    setChatDisplayed(event.currentTarget);
  };

  const handleCloseChat = () => {
    setChatDisplayed(null);
  };
  /************************************/

  const handleLeaderboardClick = event => {
    setLeaderboardDisplayed(event.currentTarget);
  };

  const handleCloseLeaderboard = () => {
    setLeaderboardDisplayed(null);
  };

  function LeaderBoardTop(props) {
    if (isMobile) {
      return (
        <div>
          <AppBar>
            <Toolbar>
              <IconButton onClick={handleLeaderboardClick}>
                <MenuRoundedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Menu
            id="leaderboard-pliant"
            open={Boolean(LeaderboardDisplayed)}
            onClose={handleCloseLeaderboard}>
            <MenuItem>
              <AppBar position="static">
                <Tabs aria-label="simple tabs example">
                  <Tab label="Players" />
                  <Tab label="Statistic" />
                </Tabs>
              </AppBar>
            </MenuItem>
            <MenuItem>
              <Box minHeight="300px" height={0.75} overflow="auto">
                <List >
                  <ListItemSample />
                  <ListItemSample />
                </List>
              </Box>
            </MenuItem>
            <MenuItem>
              <Grid container alignItems="center" justify="center" spacing={1} align="center">
                <Grid item>LeaderBoard</Grid>
                <Grid item>
                  <Switch value="checkedC" />
                </Grid>
                <Grid item>Draw Order</Grid>
              </Grid>
            </MenuItem>
          </Menu>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }

  function LeaderboardPlateforme(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    if (isMobile) {
      return (
        <div></div>
      );
    }
    else {
      return (
        <Paper>
          <AppBar position="static">
            <Tabs aria-label="simple tabs example" onChange={handleChange} value={value} variant="fullWidth">
              <Tab label="Players" />
              <Tab label="Statistic" />
            </Tabs>
          </AppBar>
          <Box minHeight="250px" overflow="auto">
            <TabPanel value={value} index={0} >
              <List>
                {
                  listPlayer.map((player, index) => <PlayerList key={index} index={index} username={player.username} id={player.socketID} score={player.pointsTotal} />)
                }
              </List>
            </TabPanel>
            <TabPanel value={value} index={1}>Item Two</TabPanel>
          </Box>
          <Grid container alignItems="center" justify="center" align="center">
            <Grid item>LeaderBoard</Grid>
            <Grid item>
              <Switch
                value="checkedC"
              />
            </Grid>
            <Grid item>Draw Order</Grid>
          </Grid>
        </Paper>
      );
    }
  }

  function ChatPlateforme(props) {
    if (isMobile) {
      return (
        <Chat chat={chat} enterKey={_handleKeyDown} />
      );
    }
    else {
      return (
        <Chat chat={chat} enterKey={_handleKeyDown} />);
    }
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
    });
    socket.on('drawer', function (data) {
      setChat(chat => [...chat, data.username + " is drawing!"])
      setCurrentDrawerName(data.username);
      setDrawing(data.socketID == socket.id);
      //On vide la listPath à chaque fois 
      setListPath([]);
    });
    socket.on('drawCmd', async function (data) {
      if(drawing) return;
      pathsArray = [...pathsArray, data];
      console.log("//////// VIEWER DATA : " + JSON.stringify(data.time) + " / " + JSON.stringify(data.id) + " / " + JSON.stringify(data.color));
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
    if(window.location.hostname == "guessify.me")
    socket = openSocket('http://ws.guessify.me:8880/');
    else
    socket = openSocket('http://'+window.location.hostname+':8880/');
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

  return (
    <Box display="flex" height={1} padding={2}>
      <Box display="flex" height={1} flexDirection="column" flexGrow={4} id="svgArea">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h5" align="center">{currentDrawerName} is drawing...</Typography>
          <Box mx={1}></Box>
          <Typography variant="h4" align="center">_ _ _ _ _ _ _ _</Typography>
        </Box>
        <LinearProgress />
        {
          drawing ?
            ( // drawer view
              <DrawerArea socket={socket} />
            ) :
            ( // guesser view
              <RenderAreaV2 listPath={listPath} />
            )
        }
      </Box>
      <Box mx={1}></Box>
      <Box display="flex" height={1} flexDirection="column">
        <LeaderboardPlateforme />
        <Chat chat={chatArray} enterKey={_handleKeyDown} flexGrow={1} />
      </Box>
    </Box>
  );
}

export default GamePage;


/*************************************************************************************************
 * OLD GAME PAGE (must be removed)
 *************************************************************************************************
<Box container display="flex">
<Grid item xs={12} md={9}>
<Box display="flex" flexDirection="column" justifyContent="center" height={1} flexGrow={1}>
<Box my={1} height={1}>
<Typography variant="h5" align="center"> is drawing...</Typography>
</Box>
<Box my={1}>
<LinearProgress />
</Box>
<Box my={1} className="fullHeight" display="flex" flexDirection="column" height={1}>
{/*
drawing ?
( // drawer view
<DrawerArea className="fullHeight" socket={socket} />
) :
( // guesser view
<DrawingRenderArea className="fullHeight" socket={socket} />
)
}
<DrawerArea socket={socket} />
</Box>
<Box my={1}>
<Typography variant="h4" align="center">_ _ _ _ _    _ _ _</Typography>
</Box>
</Box>
</Grid>
<Grid item xs={12} md={3}>
<Box className="fullHeight" display="flex" flexDirection="column" >
<Paper>
<LeaderboardPlateforme />
</Paper>
<Box>
<Chat chat={chatArray} enterKey={_handleKeyDown} />
</Box>
</Box>
</Grid>
</Box>

/*********************************************************************************/
