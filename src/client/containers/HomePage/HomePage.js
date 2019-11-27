/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './style.css';
import { Divider, Hidden, CardMedia } from '@material-ui/core';
const theme = createMuiTheme();
const classes = {
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
};

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }
  

  render() {
    

    return (
      <React.Fragment>
      <main className="maindiv">
        <Paper className="paper">
          
          <React.Fragment>
            
      
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item>
          <img id="banner" title="This is our awesome banner ! Cool huh ?" src="/src/client/images/bannière.png" />
        </Grid>
        <Grid item xs={12} sm={5}>
        <Typography  variant="h5" align="center">
            Quick Play
          </Typography>
          <TextField
          
            id="firstName"
            name="username"
            label="Username"
            fullWidth
            autoComplete="fname"
          />
          <div className="butt">
          <Button variant="contained" size="medium" color="primary" fullWidth>
          Play
        </Button>
          </div>
          

        </Grid>
        <Grid item xs={12} sm={2}>
        <Typography  variant="h6" align="center">
            OR
          </Typography>
        </Grid>
        
        <Grid item xs={12} sm={5}>
        <Typography variant="h5" align="center">
            Log in
          </Typography>
         <Box my="10px">
         <TextField
          
          id="firstName"
          name="username"
          label="Username"
          fullWidth
          autoComplete="fname"
        />
        <TextField
          
          id="firstName"
          name="username"
          label="Password"
          type="password"
          fullWidth
          autoComplete="fname"
        />
        <Button id="logInButton" variant="contained" size="medium" color="primary" fullWidth>
          Log in
        </Button>
        <Button id="otherMethodsButton"variant="contained" size="medium" color="primary" fullWidth>
          Other methods
        </Button>
        <Button id="signInButton" variant="contained" size="medium" color="primary" fullWidth>
          Sign in
        </Button>
        
         </Box>


         
        </Grid>
        
      </Grid>
    </React.Fragment>
          
        </Paper>
      </main>
    </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};

export default HomePage