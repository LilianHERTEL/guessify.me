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
const QuickPlay = (props) => {
    const [usernameAnonymous, setUsernameAnonymous] = useState('');
    return (
    <React.Fragment>
 <Typography component="h1" variant="h5" align="center" color="primary">Quick play</Typography>
    <TextField
      style={{ marginTop: 10, marginBottom: 10 }}
      id="usernameGuest"
      name="username"
      label="Username"
      value={usernameAnonymous}
      onChange={e => setUsernameAnonymous(e.target.value)}
      fullWidth
      autoComplete="fname"
      onKeyDown={e => toGamePage(e)}
    />
    <Link to={{ pathname: '/game', state: { username: usernameAnonymous } }}>
      <Button id="guestPlayRedirectLink" variant="contained" size="medium" color="primary" fullWidth>Play</Button>
    </Link>
    </React.Fragment>
   )
}

export default QuickPlay