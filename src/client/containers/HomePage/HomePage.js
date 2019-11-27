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

async function kek(){}

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

/*
  state={
    usernameM: "",
    passwordM: "",
  }

  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
  }
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log([name]);
  };

  async tryConnect(){
    /*const preFlight = await fetch('http://localhost:8080/auth/login',{
      method: 'OPTIONS',
      headers:{
        'Access-Control-Request-Method':'POST',
        'Access-Control-Request-Headers': 'Content-Type'

      }
    })
    console.log("Envoi preFlight !");
    console.log(await preFlight.json());
*/
/*
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: UsernameM.value, password: PasswordM.value }),
    })
    console.log("YEET");
    console.log(await response.json());
    return response;
  }
  
*/
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
<<<<<<< Updated upstream
          
            id="firstName"
=======
            id="usernameGuest"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
          
          id="firstName"
=======
          id="UsernameM"
>>>>>>> Stashed changes
          name="username"
          label="Username"
          fullWidth
          autoComplete="fname"
          value={this.state.usernameM}
          onChange={this.handleChange('usernameM')}
        />
        <TextField
          
<<<<<<< Updated upstream
          id="firstName"
          name="username"
=======
          id="PasswordM"
          name="password"
>>>>>>> Stashed changes
          label="Password"
          type="password"
          fullWidth
          autoComplete="fname"
          value={this.state.passwordM}
          onChange={this.handleChange('passwordM')}
        />
        <Button onClick={this.tryConnect.bind(this)} id="logInButton" variant="contained" size="medium" color="primary" fullWidth>
          Log in
        </Button>
<<<<<<< Updated upstream
        <Button id="otherMethodsButton"variant="contained" size="medium" color="primary" fullWidth>
          Other methods
        </Button>
        <Button id="signInButton" variant="contained" size="medium" color="primary" fullWidth>
          Sign in
=======
        
        <Typography  variant="h5" align="center">
            - or -
          </Typography>



          <Grid container spacing={3} justify="center" id="OtherConnections">
            <Grid item>
            <IconButton title="Connect with Google">
              <SvgIcon>
                <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" />
              </SvgIcon>
            </IconButton>
            </Grid>
            <Grid item>
              <IconButton title="Connect with Twitter">
              <SvgIcon>
                <path  d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </SvgIcon>
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton title="Connect with Facebook">
              <SvgIcon>
                <path  d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
                </SvgIcon>
              </IconButton> 
            </Grid>

          </Grid>

        <Typography align="center">
          You want an account ?
        </Typography>

        <Button id="signInButton" variant="contained" size="medium" color="primary" fullWidth href="/signup">
          Sign in !
>>>>>>> Stashed changes
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