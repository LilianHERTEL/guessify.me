import React from 'react';
import ClearDrawingTool from './ClearDrawingTool';
import SizingTool from './SizingTool';
import SwitchBrushModeTool from './SwitchBrushModeTool';
import ColorPickerTool from './ColorPickerTool';
import { Paper, Box, Grid } from '@material-ui/core';

const DrawingTools = ({ socket, brushSize, setBrushSize, brushColor, setBrushColor, rgbBrushColor, setRgbBrushColor, brushMode, setBrushMode }) => {
    return (
        <Box mt={1}>
            <Paper>
                <Box p={1}>
                    <Box display="flex" flexDirection="row" alignContent="center" alignItems="center" justify="space-evenly">
                        <ColorPickerTool brushColor={brushColor} setBrushColor={setBrushColor} setBrushMode={setBrushMode} setRgbBrushColor={setRgbBrushColor} />
                        <SwitchBrushModeTool socket={socket} brushColor={brushColor} brushMode={brushMode} setBrushMode={setBrushMode} rgbBrushColor={rgbBrushColor} />
                        <SizingTool brushSize={brushSize} setBrushSize={setBrushSize} />
                        <ClearDrawingTool socket={socket} />
                    </Box>
                </Box>
            </Paper>
        </Box >
    )
}

export default DrawingTools;