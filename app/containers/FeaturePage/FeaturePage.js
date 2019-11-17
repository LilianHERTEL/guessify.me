/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider,Switch, TextField,ListItemSecondaryAction } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function ListItemSample(props){
  return(
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
export default class FeaturePage extends React.Component {

  render() {
    return (
      <Box my={2} className="page">
        <Box my={5} className="fullHeight">
          <Grid container direction="row" justify="center" alignItems="stretch" spacing={3} className="fullHeight">
            <Grid item xs={12} md={9}>
              <Box display="flex" flexDirection="column" justifyContent="center" height={1}>
                <Box my={1}>
                  <Typography variant="h4" align="center">thomasxd24 is drawing...</Typography>
                </Box>
                <Box my={1}>
                  <LinearProgress />
                </Box>
                <Box my={1}>
                  <Paper><canvas className="canvas">
                    </canvas></Paper>
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
                <Grid container alignItems="center" justify="center" spacing={1} align="center">
          <Grid item>LeaderBoard</Grid>
          <Grid item>
            <Switch
              // checked={state.checkedC}
              // onChange={handleChange('checkedC')}
              value="checkedC"
            />
          </Grid>
          <Grid item>Draw Order</Grid>
        </Grid>
                    <Box minHeight="400px"  height={0.9} overflow="auto">
                    <List >
     
     <ListItemSample />
     <ListItemSample />
     


</List>
                    </Box>

                </Paper>
                {/* <Typography variant="h6" align="center">Leaderboard</Typography> */}
                <Box flex="1" mt={3} maxHeight="400px">
                  <Paper className="fullHeight">
                  
<TabPanel>

                  
</TabPanel>
                  
                  </Paper>
               
                  
                </Box>
              </Box>

            </Grid>
          </Grid>



        </Box>
      </Box>

    );
  }
}
