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
    justifyContent: "center"
  },
  bottom: {
    backgroundColor: "#3f51b5",
    color: "white",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
    paddingTop: ".5rem",
    paddingBottom: ".5rem"
  },
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  chatArea: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
}));

function Chat(prop) {
  const [test, setTest] = React.useState(0);

  React.useEffect(() => {
    console.log("Chat MOUNTED");
    // Sets the initial chat height
    const h = document.getElementById("chatBox").clientHeight;
    setTest(h);
  }, []);

  window.onresize = () => {
    const newChatHeight = document.getElementById("chatBox").clientHeight;
    setTest(newChatHeight);
  }

  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block : "end"})
  }

  React.useEffect(scrollToBottom, [prop.chat]);

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Box className={classes.chatArea}>
        <AppBar position="static" className={classes.header}>
          <Box display="flex" alignItems="center" ml={2}>
            <Typography variant="h6" className={classes.title}>
              LEADERBOARD
            </Typography>
          </Box>
        </AppBar>
        <Box flexGrow={1}>
          <Box display="flex" flexDirection="column" height={1} id="chatBox">
            <Box overflow="auto" px={1} height={1} maxHeight={test}>
              {prop.chat.map((value, key) => (
                <div key={key}>{value}</div>
              ))}
              <div ref={messagesEndRef} />
            </Box>
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
        <Box width={1} px={1} className="textField">
          <TextField
            className="textField"
            fullWidth
            placeholder="Chat here..."
            onKeyPress={prop.enterKey}
          />
        </Box>
      </Grid>
    </Paper>
  );
}

export default Chat;