import React from 'react';
import { Box,TextField } from '@material-ui/core';

function Chat(prop) {
    return (
        <Box display="flex" flexDirection="column" height={1} overflow="auto" maxHeight="700px">
        <Box flex={1} overflow="auto" minHeight="-webkit-min-content" marginX={1}>
        {
        prop.chat.map((value,key) => (
       <p key={key} >{value}</p>
    ))}
        </Box>
        <Box margin={1}>
<TextField fullWidth placeholder="Chat here..." onKeyPress={prop.enterKey}></TextField>
        </Box>
    </Box>
    )
   
    ;
  }

export default Chat;