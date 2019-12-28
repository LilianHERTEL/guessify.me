import React from 'react';
import { Box, IconButton, Typography, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

<<<<<<< HEAD
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
=======


const ClearDrawingTool = ({onToolClick}) => {
    function handleClick() {
        onToolClick();
    }

    return (
        <Button onClick={handleClick}>
            <Box display="flex" flexDirection="column" justify="center" alignItems="center">
                <DeleteForeverIcon fontSize="large"/>
                <Typography variant="caption">Clear drawing</Typography>
            </Box>
        </Button>
>>>>>>> 9a5f1fb6e75f07e85e6fa3f4d55aef21a3c69479
    )
}

export default ClearDrawingTool;