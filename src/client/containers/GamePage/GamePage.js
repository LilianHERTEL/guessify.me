/*
 * GamePage
 *
 * List all the features
 */
import React, {useState, useRef,useEffect} from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chat from './Chat'
import openSocket from 'socket.io-client';
import DrawingArea from './DrawingArea';
import DrawingRenderArea from './DrawingRenderArea';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import { array } from 'prop-types';

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

const GamePage = (props) => {
  const [loading, setLoading] = useState(true);
  const [lobby, setLobby] = useState(null);
  const [chatArray, setChat] = useState([]);
  const socket = useRef(null);
  
  const connect =  (username) => {
    console.log("hi");
    
    socket.current.on('connect', function(){
      socket.current.emit("findGame","thomasxd24")
    });
    socket.current.on('Unauthorized', function(data){
      console.error(data)
    });
    socket.current.on('joinedGame', function(data){
      console.log(data)
      setChat([...chatArray,"Join Lobby "+data.lobby.codeLobby])
    });
    socket.current.on('receiveChat', function(data){
      setChat([...chatArray,data])
    });
    socket.current.on('disconnect', function(){});
  }

  useEffect(() => {
    socket.current = openSocket('http://localhost:8080');
    connect(props.location.state.username);
    
  }, []);

  

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if(e.target.value == "") return
      socket.emit("sendChat",e.target.value)
      e.target.value = ""
    }
  }


  const mobileContent = ()=>{
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
                <Box my={1}>
                  <DrawingArea/>
                </Box>
                
              </Box>

            </Grid>
          </Grid>
            



        </Box>
      </Container>
    );
  }

    if(!props.location.state)
    return(<h3>Not authorised</h3>)
    if(isMobile)
    return mobileContent();
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
                  <DrawingArea className="fullHeight" socket={socket.current}/>
                  <DrawingRenderArea className="fullHeight" socket={socket.current}/>
                </Box>
                <Box my={1}>
                  <Typography variant="h4" align="center">_ _ _ _ _    _ _ _</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box display="flex" flexDirection="column" justifyContent="center" height={1}>
                <Paper>
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