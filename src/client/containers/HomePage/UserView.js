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
async function disconnect() {
    const response = await fetch('/api/auth/logout')
    if (response.ok) {
      var data = await response.json();
    }
    else {
    }
  }
const UserView = ({user}) => {
    return (<React.Fragment>
        <Typography variant="h6" align="center">
          Connected as {user.username}
        </Typography>
        <Link to={{ pathname: '/game', state: { username: user.username, accountID: user._id } }}>
    <Button id="guestPlayRedirectLink" variant="contained" size="medium" color="primary" fullWidth>Play</Button>
    </Link>
        <Button onClick={disconnect}>Deconnexion</Button>
      </React.Fragment>)
}

export default UserView;