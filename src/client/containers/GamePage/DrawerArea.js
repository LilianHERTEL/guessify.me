import React from 'react';
import DrawingArea from './DrawingArea';
import DrawingTools from './DrawingTools';

const DrawerArea = ({ socket }) => {
    const [brushSize, setBrushSize] = React.useState(5);
    const [brushColor, setBrushColor] = React.useState("#000000");
    const [brushMode, setBrushMode] = React.useState("Draw"); // 'draw' || 'erase'
    const [brushShape, setBrushShape] = React.useState("round"); // WIP (circle, rectangle, etc. ?)

    return (
        <React.Fragment>
            <DrawingArea
                socket={socket}
                brushSize={brushSize}
                brushColor={brushColor}
                brushMode={brushMode}
            />
            <DrawingTools
                socket={socket}
                brushSize={brushSize} setBrushSize={setBrushSize}
                brushColor={brushColor} setBrushColor={setBrushColor}
                brushMode={brushMode} setBrushMode={setBrushMode}
            />
        </React.Fragment>
    );
}

export default DrawerArea;