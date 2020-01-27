import React from 'react';
import ClearDrawingTool from './ClearDrawingTool';
import SizingTool from './SizingTool';
import SwitchBrushModeTool from './SwitchBrushModeTool';
import ColorPickerTool from './ColorPickerTool';
import { Paper, Box, Grid } from '@material-ui/core';

const DrawingToolsVertical = ({ socket, brushSize, setBrushSize, brushColor, setBrushColor, rgbBrushColor, setRgbBrushColor, brushMode, setBrushMode }) => {
    return (
        <Paper>
            <Box>
                <Box p={1}>
                    <Box display="flex" flexDirection="column" alignContent="center" alignItems="center" justify="space-evenly">
                        <SwitchBrushModeTool socket={socket} brushColor={brushColor} brushMode={brushMode} setBrushMode={setBrushMode} rgbBrushColor={rgbBrushColor} />
                        <SizingTool brushSize={brushSize} setBrushSize={setBrushSize} />
                        <ClearDrawingTool socket={socket} />
                    </Box>
                </Box>
            </Box >
        </Paper>
    )
}

export default DrawingToolsVertical;