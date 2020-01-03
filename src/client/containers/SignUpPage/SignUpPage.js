/**
 *
 * SignUpPage
 *
 * This component contains the form that allows visitors to sign up for a Guessify account
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Link as RouterLink} from 'react-router-dom'; //aliased to avoid confusion with Mateeriel-UI Link component

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
      password: '',
      confirmPassword: '',
      email: '',
      tosAgreement: false,
      isValidEmail: false,
      isValidConfirmPassword: false
    }
    this.onAnyInputChange = this.onAnyInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordsInputChange = this.onPasswordsInputChange.bind(this);
    this.onSignUpButtonClick = this.onSignUpButtonClick.bind(this);
    this.onTosAgreementChange = this.onTosAgreementChange.bind(this);
  }

  validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  onEmailInputChange(event){
    const val = event.target.value;
    const isValid = this.validateEmail(val);
    this.setState({
      email: val,
      isValidEmail: isValid
    });
  }

  validatePasswords(passwd1, passwd2) {
    return passwd1 === passwd2;
  }
  onPasswordsInputChange(event){
    const name = event.target.name;
    const val = event.target.value;
    let isValid;
    const unchangedInput = name === password ? 'confirmPassword' : 'password';
    isValid = this.validatePasswords(val, this.state[unchangedInput]);
    this.setState({
      [name]: val,
      isValidConfirmPassword: isValid
    });
  }

  onTosAgreementChange(event) {
    this.setState({
      tosAgreement: event.target.checked
    });
  }

  onAnyInputChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  async sendRequest(user){
    return await fetch('/api/auth/register', {
      method: 'POST',
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
    if(!this.state.isValidEmail || !this.state.isValidConfirmPassword || !this.state.tosAgreement) {
      alert("Please fill in all the fields");
      return;
    }
    this.sendRequest(user);
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Grid item>
            <img id="banner" title="This is our awesome banner ! Cool huh ?" src="/src/client/images/banner.png" />
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
                      onChange={this.onEmailInputChange}
                      error={!this.state.isValidEmail}
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
                      onChange={this.onPasswordsInputChange}
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
                      onChange={this.onPasswordsInputChange}
                      error={!this.state.isValidConfirmPassword}
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <FormControlLabel
                      control={<Checkbox name="tosAgreement" checked={this.state.tosAgreement} color="primary" />}
                      label={
                          <React.Fragment>
                            I agree with <RouterLink to="#">Terms and Conditions</RouterLink>
                          </React.Fragment>
                      }
                      onChange={this.onTosAgreementChange}
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
                  You already have an account? <RouterLink to="/">Log in</RouterLink>
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