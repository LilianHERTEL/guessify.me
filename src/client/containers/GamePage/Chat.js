import React from 'react';
import { Box,TextField,Typography } from '@material-ui/core';

function Chat(prop) {
  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })  }

  React.useEffect(scrollToBottom, [prop.chat]);

    return (
      <Box height={1}>
 <Box display="flex" flexDirection="column" height={1} overflow="auto" maxHeight="500px" minHeight="500px">
        <Box flex={1} overflow="auto" minHeight="-webkit-min-content" marginX={1}>
        {
        prop.chat.map((value,key) => (
          <Typography variant="body2" key={key}>
       {value}
       
      </Typography>
      
    ))}
    <div ref={messagesEndRef} />
        </Box>
        
    </Box>
    <Box margin={1}>
    <TextField fullWidth placeholder="Chat here..." onKeyPress={prop.enterKey}></TextField>
            </Box>
      </Box>
       
    )
   
    ;
  }

export default Chat;