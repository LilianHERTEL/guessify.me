import React from 'react';
import DrawingArea from './DrawingArea';
import DrawingTools from './DrawingTools';

const maxBrushSize = 100;
const minBrushSize = 1;

const DrawerArea = ({ socket }) => {
    const [brushSize, setBrushSize] = React.useState(30);
    const [brushColor, setBrushColor] = React.useState("#000000");
    const [brushShape, setBrushShape] = React.useState("round"); // WIP
    const [brushMode, setBrushMode] = React.useState("Draw"); // 'draw' || 'erase'

    /*************************
     * DrawingTools handlers *
    /*************************/
    const handleChangeSize = (value) => {
        (brushSize + value <= maxBrushSize && brushSize + value >= minBrushSize) ?
            setBrushSize(brushSize + value) :
            null;
    }

    const handleChangeColor = (newColor) => {
        setBrushColor(newColor);
        setBrushMode('Draw');
    }

    const handleChangeShape = () => {

    }

    const handleChangeMode = (newMode) => {
        setBrushMode(newMode);
        console.log("VALUE = " + newMode);
    }

    return (
        <React.Fragment>
            <DrawingArea socket={socket} brushSize={brushSize} brushColor={brushColor} brushShape={brushShape} brushMode={brushMode} />
            <DrawingTools socket={socket} brushSize={brushSize} brushColor={brushColor} brushMode={brushMode} handleChangeSize={handleChangeSize} handleChangeColor={handleChangeColor} handleChangeMode={handleChangeMode} />
        </React.Fragment>
    );
}

export default DrawerArea;