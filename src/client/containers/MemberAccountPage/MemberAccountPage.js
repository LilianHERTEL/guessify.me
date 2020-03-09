/**
 * MemberDetailsPage
 *
 * This component contains the form that allows members to view their account's details and modify some information (email, etc.)
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
import { makeStyles } from '@material-ui/core/styles';

import {Link as RouterLink} from 'react-router-dom'; //aliased to avoid confusion with Mateeriel-UI Link component

const useStyles = makeStyles(theme => ({
  list: {
    overflow: "auto",
    maxHeight: 180
  }
}));

const MemberAccountPage = (props) => {

  const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs">
        <Grid sm={12}>
          <Grid item sm={6}>
            <Box>
              <Typography>Username: {}</Typography>
              <Typography>Email: {}</Typography>
              <Typography>Password: {}</Typography>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box>
              <Button>Change Username</Button>
              <Button>Change Email</Button>
              <Button>Change Password</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
}

export default MemberAccountPage;