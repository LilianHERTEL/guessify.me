import React from 'react';
import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import banner from '../../images/banner.png';
import './style.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GuestView from './GuestView';
import UserView from './UserView';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}






/*
 * HomePage component
 *
 * This is the first thing users see of our App, at the '/' route
 */
const HomePage = (props) => {


  const [user, setUser] = useState(null);
  const [snackBarText, setText] = useState(null)
  const [severity,setSeverity] = useState("success")
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setText(null)
    setSeverity("success")
  };

  const showAlert = (text, severity) => {

    setText(text)
    setSeverity(severity)
  };



  

  

 

  return (        <React.Fragment>
    <main className="maindiv">
    <Snackbar open={snackBarText != null} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity={severity}>
          {snackBarText}
        </Alert>
      </Snackbar>
      <div>
        <img id="banner" title="This is our awesome banner ! Cool huh ?" src={banner} style={{ marginLeft: 125 }} />
      </div>
      <Paper className="paper">
        {user ? (<UserView user={user} />):(<GuestView onLogin={(user) => setUser(user)} showAlert={showAlert} />) }
      </Paper>
          </main>
        </React.Fragment>)
}

export default HomePage;