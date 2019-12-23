import React from 'react';
import { Box, IconButton, Typography, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ClearDrawingTool = ({ socket, onToolClick }) => {
    function handleClick() {
        socket.emit('clearDrawing');
    }
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
            <IconButton onClick={handleClick} color="primary" size="small">
                <DeleteForeverIcon fontSize="large"></DeleteForeverIcon>
            </IconButton>
            <Typography variant="caption">Clear drawing</Typography>
        </Box>
    )
}

export default ClearDrawingTool;