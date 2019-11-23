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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Link as RouterLink} from 'react-router-dom';
import color from '@material-ui/core/colors/purple';

const useStyles = makeStyles(theme => ({
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
}));

export default function SignUpPage() {
  const classes = useStyles();

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
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="UserName"
                    name="lastName"
                    autoComplete="lname"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="current-password"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="agreementToS" color="primary" />}
                    label={
                        <React.Fragment>
                            <span>I agree with </span>
                            <Link href="#" variant="body1">
                                Terms and Conditions
                            </Link>
                        </React.Fragment>
                    }
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
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