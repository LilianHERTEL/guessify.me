/*
 * GamePage
 *
 * List all the features
 */
import React, {useState,useEffect, useRef} from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chat from './Chat'
import openSocket from 'socket.io-client';
import DrawingArea from './DrawingArea';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { array, func } from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function ListItemSample(props) {
  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="thomasxd24" secondary="231 points" />
        <ListItemSecondaryAction>
          #2
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
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const GamePage = (props) => {

  const [loading, setLoading] = useState(true);
  const [lobby, setLobby] = useState(null);
  const [chat, setChat] = useState([]);
  const [chatDisplayed, setChatDisplayed] = useState(null);
  const [LeaderboardDisplayed, setLeaderboardDisplayed] = useState(null);

  const socketRef = useRef(null);
  const connect = async (username) => {
    console.log("test")
    socketRef.current = openSocket('http://localhost:8080');
    var socket = socketRef.current;
    socket.on('connect', function(){
      socket.emit("findGame","thomasxd24")
    });
    socket.on('Unauthorized', function(data){
      console.error(data)
    });
    socket.on('joinedGame', function(data){
      console.log(data)
      setChat(oldChat => [...oldChat,"Joined Lobby"+data.codeLobby])
    });
    socket.on('announcement', function(data){
      setChat(oldChat => [...oldChat,data])
      
    });
    socket.on('drawer', function(data){
      setChat(oldChat => [...oldChat,username+ " is the one drawing!"])
      
    });
    socket.on('receiveChat', function(data){
      setChat(oldChat => [...oldChat,data])
      
    });
    socket.on('disconnect', function(){});
  
  }

useEffect(() => {
  connect(props.location.state.username)
}, [props.location.state.username]);

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(e.target.value == "") return
      socketRef.current.emit("sendChat",e.target.value)
      e.target.value = ""
    }
  }

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

  function LeaderBoardTop(props) {
    if (isMobile) {
      return (

        <div>
          <AppBar>
            <Toolbar>
              <IconButton
              onClick={handleLeaderboardClick}>
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
                  <Switch
                    value="checkedC"
                  />
                </Grid>
                <Grid item>Draw Order</Grid>
              </Grid>
            </MenuItem>
          </Menu>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }

  function LeaderboardPlateforme(props) {
    if (isMobile) {
      return (
        <div></div>
      );
    }
    else {
      return (
        <div>
          <AppBar position="static">
            <Tabs aria-label="simple tabs example">
              <Tab label="Players" />
              <Tab label="Statistic" />
            </Tabs>
          </AppBar>
          <Box minHeight="300px" height={0.75} overflow="auto">
            <List >
              <ListItemSample />
              <ListItemSample />
            </List>
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

  if (!props.location.state)
    return (<h3>Not authorised</h3>)
  return (
    <Container maxWidth="xl" className="fullHeight">
      <LeaderBoardTop />


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
              <Box my={1}>
                <DrawingArea />
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
                  <ChatPlateforme />
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