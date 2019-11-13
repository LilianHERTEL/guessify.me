/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import './style.scss';
import Header from 'components/Header';
import { Divider, Hidden } from '@material-ui/core';
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
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm 
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };
    

    return (
      <React.Fragment>
        <Header></Header>
      <main className="maindiv">
        <Paper className="paper">
          
          <React.Fragment>
      
      <Grid container spacing={3} justify="center" alignItems="center">
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
         <Button variant="contained" size="medium" color="primary" fullWidth>
          Play
        </Button>
         </Box>
         <Box my="10px">
         <Button variant="contained" size="medium" color="primary" fullWidth>
          Play
        </Button>
         </Box>
         <Box my="10px">
         <Button variant="contained" size="medium" color="primary" fullWidth>
          Play
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};

export default HomePage