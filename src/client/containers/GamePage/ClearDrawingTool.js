import React from 'react';
import { Box, IconButton, Typography, Button } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



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
    )
}

export default ClearDrawingTool;