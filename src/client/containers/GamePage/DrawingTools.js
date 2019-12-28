import React from 'react';
import ClearDrawingTool from './ClearDrawingTool';
import SizingTool from './SizingTool';
import SwitchBrushModeTool from './SwitchBrushModeTool';
import ColorPickerTool from './ColorPickerTool';
import { Paper, Box, Grid } from '@material-ui/core';

const DrawingTools = ({ socket, brushSize, setBrushSize, brushColor, setBrushColor, brushMode, setBrushMode }) => {
    return (
        <Box mt={1}>
            <Paper>
                <Box p={1}>
                    <Grid container alignContent="center" alignItems="center" justify="space-evenly">
                        <ClearDrawingTool item xs={1} socket={socket} />
                        <ColorPickerTool brushColor={brushColor} setBrushColor={setBrushColor} setBrushMode={setBrushMode} />
                        <SwitchBrushModeTool item xs={1} socket={socket} brushColor={brushColor} brushMode={brushMode} setBrushMode={setBrushMode} />
                        <SizingTool item xs={1} brushSize={brushSize} setBrushSize={setBrushSize} />
                    </Grid>
                </Box>
            </Paper>
        </Box >
    )
}

export default DrawingTools;