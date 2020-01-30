import React from 'react';
import { Paper, Grid, Box, Container, List,ListItem,ListItemAvatar,ListItemText,Avatar, LinearProgress, Typography, AppBar, Tabs, Tab, Toolbar, IconButton, Menu, MenuItem, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-fa-solid/crown';

const useStyles = makeStyles(theme => ({
  list: {
    overflow: 'auto',
    maxHeight: 300,
    height: 300
  },
  title:{
    flexGrow:1
  },
  header:{
    borderTopLeftRadius:"inherit",
    borderTopRightRadius:"inherit"
  },
  bottom:{
    backgroundColor:"#3f51b5",
    color:"white",
    borderBottomLeftRadius:"inherit",
    borderBottomRightRadius:"inherit"
  },
  botContent:{
    marginTop:".5rem",
    marginBottom:".5rem"
  },
  position:{
    fontWeight:"bold"
  }
}));

function Crown(props){
  if(props == null) return "";
  let colors = ['#FFF501','#E8E8E8','#DB8D0E'];
  switch(props.index+1){
    case 1:
    case 2:
    case 3:
      return <Icon icon={crownIcon} color={colors[props.index]} height="1.5rem" />;
      break;
    default:
      return "";
      break;
  }
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
        <Crown index={props.index}/>
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

function LeaderBoard({listPlayer}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sortPlayers = (a,b) => {
    console.log("COMPARE : " + a.pointsTotal + " " + b.pointsTotal);
    return b.pointsTotal-a.pointsTotal;
  }

  /*

      <AppBar position="static">
        <Tabs aria-label="simple tabs example" onChange={handleChange} value={value} variant="fullWidth">
          <Tab label="Players" />
          <Tab label="Statistics" />
        </Tabs>
      </AppBar>
      <Box minHeight="250px"> 
        <TabPanel className={classes.list} value={value} index={0}>
          
        </TabPanel>
        <TabPanel value={value} index={1}><SettingsIcon/></TabPanel>
      </Box>
   
   */
  const classes = useStyles();

    return (
      <Paper>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            LEADERBOARD
          </Typography>
          <IconButton edge="end" maxHeight="20%" color="inherit" aria-label="menu">
              <SettingsIcon fontSize="small"/>
          </IconButton>
        </Toolbar>
      </AppBar>
        <List className={classes.list}>
            {
              listPlayer.sort(sortPlayers).map((player, index) => <PlayerList key={index} index={index} username={player.username} id={player.socketID} score={player.pointsTotal} />)
            }
        </List>
      <Grid container alignItems="center" justify="center" align="center" className={classes.bottom}>
        <span className={classes.botContent}>You will draw in <span className={classes.position}>2</span> rounds.</span>
      </Grid>
    </Paper>
    )
}

export default LeaderBoard;