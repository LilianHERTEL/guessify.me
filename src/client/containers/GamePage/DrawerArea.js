import React from 'react';
import DrawingArea from './DrawingArea';
import DrawingToolsVertical from './DrawingToolsVertical';
import { Box } from '@material-ui/core';
import DrawingToolsHorizontal from './DrawingToolsHorizontal';

const DrawerArea = ({ socket }) => {
    const [brushSize, setBrushSize] = React.useState(20);
    const [brushColor, setBrushColor] = React.useState("#1266db");
    const [rgbBrushColor, setRgbBrushColor] = React.useState({r:18, g:102, b:219});
    const [brushMode, setBrushMode] = React.useState("Draw"); // 'draw' || 'erase'
    const [brushShape, setBrushShape] = React.useState("round"); // WIP (circle, rectangle, etc. ?)

    return (
        <Box display="flex" flexDirection="row"  mt={1}>
            <DrawingToolsVertical
                socket={socket}
                brushSize={brushSize} setBrushSize={setBrushSize}
                brushColor={brushColor} setBrushColor={setBrushColor} rgbBrushColor={rgbBrushColor} setRgbBrushColor={setRgbBrushColor}
                brushMode={brushMode} setBrushMode={setBrushMode}
            />
            <Box mr={1}></Box>
            <Box display="flex" height={1} flexDirection="column" flexGrow="1">
                <DrawingArea
                    socket={socket}
                    brushSize={brushSize}
                    brushColor={brushColor}
                    brushMode={brushMode}
                />
                <DrawingToolsHorizontal
                    socket={socket}
                    brushSize={brushSize} setBrushSize={setBrushSize}
                    brushColor={brushColor} setBrushColor={setBrushColor} rgbBrushColor={rgbBrushColor} setRgbBrushColor={setRgbBrushColor}
                    brushMode={brushMode} setBrushMode={setBrushMode}
                />
            </Box>
        </Box>
    );
}

export default DrawerArea;