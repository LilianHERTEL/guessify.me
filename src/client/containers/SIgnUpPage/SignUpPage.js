/**
 *
 * SignUpPage
 *
 * This component contains the form that allows visitors to sign up for a Guessify account
 */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Link as RouterLink} from 'react-router-dom';
import color from '@material-ui/core/colors/purple';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    padding: '20px',
    backgroundColor: theme.palette.common.white,
  },
});

class SignUpPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password:   '',
      confirmPassword: '',
      email: '',
      tosAgreement: '',
      error: ''
    }
    this.onAnyInputChange = this.onAnyInputChange.bind(this);
    this.onSignUpButtonClick = this.onSignUpButtonClick.bind(this);
  }

  onAnyInputChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  async sendRequest(user) {
    return await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }

  onSignUpButtonClick(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    console.log('Avant : ' + this.state.error);
    
    this.sendRequest(user)
    .then(res => {
      if (res.success) {
        this.setState({
          error: JSON.parse(res)
        });
        console.log(res);
      }
    });
    console.log('Après : ' + this.state.error);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Grid item>
            <img id="banner" title="This is our awesome banner ! Cool huh ?" src="/src/client/images/bannière.png" />
          </Grid>
          <Box border={1} borderColor="primary.main" borderRadius={20} className={classes.box}>
              <Typography component="h1" variant="h5" align="center" color="primary">
              Sign up
              </Typography>
              <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <TextField
                      value={this.state.username}
                      variant="outlined"
                      required
                      fullWidth
                      id="userName"
                      label="UserName"
                      name="username"
                      autoComplete="lname"
                      onChange={this.onAnyInputChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      value={this.state.email}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      onChange={this.onAnyInputChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      value={this.state.password}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.onAnyInputChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      value={this.state.confirmPassword}
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                      autoComplete="current-password"
                      onChange={this.onAnyInputChange}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel
                      name="tosAgreement" 
                      control={<Checkbox value="agreementToS" color="primary" />}
                      label={
                          <React.Fragment>
                              <span>I agree with </span>
                              <Link href="#" variant="body1">
                                  Terms and Conditions
                              </Link>
                          </React.Fragment>
                      }
                      onChange={this.onAnyInputChange}
                  />
                  </Grid>
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onSignUpButtonClick}
              >
                  Sign Up
              </Button>
              <Grid container justify="flex-end">
                  <Grid item>
                  <Link href="/" variant="body2">
                      You already have an account ? Log in
                  </Link>
                  </Grid>
              </Grid>
              </form>
          </Box>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUpPage);