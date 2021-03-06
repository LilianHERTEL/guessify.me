/*
 * GamePage
 *
 * List all the features
 */
import React, {useState, useRef,useEffect} from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Toolbar,IconButton,Menu,MenuItem, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
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
import DrawingRenderArea from './DrawingRenderArea';
import {Redirect} from 'react-router-dom';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import { array } from 'prop-types';
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
        <ListItemText primary={props.username} secondary={props.score+" points"} />
        <ListItemSecondaryAction>
          #{props.index+1}
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

const GamePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [lobby, setLobby] = useState(null);
  const [chatArray, setChat] = useState([]);
  const [chatDisplayed, setChatDisplayed] = useState(null);
  const [LeaderboardDisplayed, setLeaderboardDisplayed] = useState(null);
  const [listPlayer, setListPlayer] = useState([]);
  const [drawing,setDrawing] = useState(false);
  


  const handleChatClick = event => {
    setChatDisplayed(event.currentTarget);
  };



  const handleCloseChat = () => {
    setChatDisplayed(null);
  };

  const handleLeaderboardClick = event => {
    setLeaderboardDisplayed(event.currentTarget);
  };

  const handleCloseLeaderboard = () => {
    setLeaderboardDisplayed(null);
  };

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
        <div>
          <AppBar position="static">
            <Tabs aria-label="simple tabs example" onChange={handleChange} value={value} variant="fullWidth">
              <Tab label="Players" />
              <Tab label="Statistic" />
            </Tabs>
          </AppBar>
          <Box minHeight="250px" overflow="auto">
          <TabPanel value={value} index={0} >
          <List>
            {listPlayer.map((player,index) =>  <PlayerList key={index} index={index} username={player.username} id={player.socketID} score={player.pointsTotal}/>)}
           
            </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
            
          </Box>
          <Grid container alignItems="center" justify="center" spacing={1} align="center">
            <Grid item>LeaderBoard</Grid>
            <Grid item>
              <Switch
                value="checkedC"
              />
            </Grid>
            <Grid item>Draw Order</Grid>
          </Grid>
        </div>
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



  
  const connect =  (username) => {
    
    socket.on('connect', function(){
      
      socket.emit("findGame",username)
    });
    socket.on('Unauthorized', function(data){
      console.error(data)
    });
    socket.on('joinedGame', function(data){
      setChat(chat=>[...chat,"Connected to Lobby "+data.lobby.id])
    });
    socket.on('updateLobby', function(data){
      setListPlayer(data.listPlayer)
    });
    socket.on('receiveChat', function(data){
      setChat(chat=>[...chat,data])
    });
    socket.on('announcement', function(data){
      setChat(chat=>[...chat,data])
    });
    socket.on('draw', function(data){
      setChat(chat=>[...chat,data])
    });
    socket.on('wordToBeDrawn', function(data){
      setChat(chat=>[...chat,"The word is "+data+" !"])
    });
    socket.on('drawer', function(data){
      setChat(chat=>[...chat,data.username+" is drawing!"])
      setDrawing(data.socketID == socket.id);
    });
    socket.on('disconnect', function(){});
  }

  useEffect(() => {
    if(!props.location.state) return;
    socket = openSocket('http://localhost:8080');
    connect(props.location.state.username);
    
  }, []);

  

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(e.target.value == "") return
      socket.emit("sendChat",e.target.value)
      e.target.value = ""
    }
  }



  if (!props.location.state)
  return (<Redirect to="/" />)
return (

      <Container maxWidth="xl" className="fullHeight">
        <Box my={2} className="page" height={0.9}>
          <Grid container direction="row" justify="center" spacing={3} className="fullHeight">
            <Grid item xs={12} md={9}>
              <Box display="flex" flexDirection="column" justifyContent="center" height={1}>
                <Box my={1}>
                  <Typography variant="h5" align="center"> is drawing...</Typography>
                </Box>
                <Box my={1}>
                  <LinearProgress />
                </Box>
                <Box my={1} className="fullHeight" display="flex">
                
                  {drawing ? (<DrawingArea className="fullHeight" socket={socket}/>): (<DrawingRenderArea className="fullHeight" socket={socket}/>)}   
                </Box>
                <Box my={1}>
                  <Typography variant="h4" align="center">_ _ _ _ _    _ _ _</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" justifyContent="center" height={1}>
                <Paper>
                <LeaderboardPlateforme />
                </Paper>
                <Box flex="1" mt={3}>
                  <Paper className="fullHeight">

                 <Chat chat={chatArray} enterKey={_handleKeyDown} />
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

export default GamePage;
