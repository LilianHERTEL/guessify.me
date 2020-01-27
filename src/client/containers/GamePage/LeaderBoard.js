import React from 'react';
import { Paper, Grid, Box, Container, List,ListItem,ListItemAvatar,ListItemText,Avatar, LinearProgress, Typography, AppBar, Tabs, Tab, Toolbar, IconButton, Menu, MenuItem, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

function LeaderBoard({listPlayer}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    )
}

export default LeaderBoard;