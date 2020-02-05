import React from 'react';
import { Box, TextField, Typography, Paper, Divider } from '@material-ui/core';

function Chat(prop) {
  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block : "end"})
  }

  React.useEffect(scrollToBottom, [prop.chat]);
  return (
    <Box flexGrow={1} height={1}>
      <Paper className="fullHeight">
        <Box height={1}>
          <Box display="flex" flexDirection="column" height={1}>
            <Box overflow="auto" mx={1} mt={1} height="10em" flexGrow={1} className="borderBottomPrimary">
              {
                prop.chat.map((value, key) => <div key={key}>
                  {value}
                </div>)
              }
              <div ref={messagesEndRef} />
            </Box>
            <Box margin={1}>
              <TextField fullWidth placeholder="Chat here..." onKeyPress={prop.enterKey}></TextField>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Chat;