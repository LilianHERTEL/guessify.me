import React from 'react';
import { Button, Paper, Box } from '@material-ui/core';
import ClearDrawingTool from './ClearDrawingTool';

const DrawingTools = ({handleClearDrawing}) => {

    function onClearDrawingClick() {
        handleClearDrawing();
    }

    return (
        <Paper height="100%">
            <Box m={1}>
                <ClearDrawingTool onToolClick={onClearDrawingClick}></ClearDrawingTool>
            </Box>
        </Paper>
    )
}

export default DrawingTools;