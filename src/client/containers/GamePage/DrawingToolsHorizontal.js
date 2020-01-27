import React from 'react';
import ClearDrawingTool from './ClearDrawingTool';
import SizingTool from './SizingTool';
import SwitchBrushModeTool from './SwitchBrushModeTool';
import ColorPickerTool from './ColorPickerTool';
import { Paper, Box, Grid } from '@material-ui/core';

const DrawingToolsHorizontal = ({ socket, brushSize, setBrushSize, brushColor, setBrushColor, rgbBrushColor, setRgbBrushColor, brushMode, setBrushMode }) => {
    return (
        <Box mt={1}>
            <Paper>
                <Box p={1}>
                    <Box display="flex" flexDirection="row" alignContent="center" alignItems="center" justify="space-evenly">
                        <ColorPickerTool brushColor={brushColor} setBrushColor={setBrushColor} setBrushMode={setBrushMode} setRgbBrushColor={setRgbBrushColor} />
                    </Box>
                </Box>
            </Paper>
        </Box >
    )
}

export default DrawingToolsHorizontal;