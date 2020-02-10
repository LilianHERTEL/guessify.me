import React from 'react';
import { Box, TextField, Typography, Paper, Divider, AppBar, Toolbar, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  header: {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    boxShadow: "none",
    minHeight: "44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  bottom: {
    backgroundColor: "#3f51b5",
    color: "white",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
  },
}));

function Chat(prop) {
  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block : "end"})
  }

  React.useEffect(scrollToBottom, [prop.chat]);

  const classes = useStyles();
  return (
    <Box flexGrow={1} height={1}>
      <Paper>
        <AppBar position="static" className={classes.header}>
          <Box display="flex" alignItems="center" ml={2}>
            <Typography variant="h6" className={classes.title}>
              LEADERBOARD
            </Typography>
          </Box>
        </AppBar>
        <Box height={1}>
          <Box display="flex" flexDirection="column" height={1}>
            <Box
              overflow="auto"
              mx={1}
              mt={1}
              height="10em"
              flexGrow={1}
              className="borderBottomPrimary"
            >
              {prop.chat.map((value, key) => (
                <div key={key}>{value}</div>
              ))}
              <div ref={messagesEndRef} />
            </Box>
            <Box margin={1}>
              <TextField
                fullWidth
                placeholder="Chat here..."
                onKeyPress={prop.enterKey}
              ></TextField>
            </Box>
          </Box>
        </Box>
        <Grid
          container
          alignItems="center"
          justify="center"
          align="center"
          className={classes.bottom}
        >
          HELLO
        </Grid>
      </Paper>
    </Box>
  );
}

export default Chat;