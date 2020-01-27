import React from 'react';
import { OptionTypes } from './OptionTypes';
import { Box, Typography } from '@material-ui/core';
import { HuePicker, SketchPicker } from 'react-color';
import BlackWhiteColorPicker from './BlackWhiteColorPicker';
import reactCSS from 'reactcss'
import GuessifyColorPicker from './GuessifyColorPicker';

const ColorPickerTool = ({ brushColor, setBrushColor, setBrushMode, setRgbBrushColor }) => {

    const onChangeColor = (color, event) => {
        var obj = new Option(OptionTypes.COLOR, color);
        //console.log("COLOR CHANGED : " + obj.getType());
        //socket.emit('drawingSideOption',color);
        setBrushColor(color.hex);
        setBrushMode('Draw');
        //console.log("Changement de couleur pour : " + brushColor);
    }

    const handleColorChange = (color) => {
        setBrushColor(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
        setBrushMode('Draw');
        setRgbBrushColor({r:color.rgb.r, g:color.rgb.g, b:color.rgb.b});
        console.log("r = " + color.rgb.r);
        console.log("g = " + color.rgb.g);
        console.log("b = " + color.rgb.b);
        console.log("a = " + color.rgb.a);
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignContent="center" alignItems="center" height="4em" width={1}>
            <Box display="flex" flexDirection="row" width={1} height={1}>
                {/*<HuePicker
                disableAlpha={true}
                    item
                    xs={1}
                    color={brushColor}
                    onChange={onChangeColor}
                />*/}
                <GuessifyColorPicker
                    color={brushColor}
                    onChangeComplete={handleColorChange} />
            </Box>
            {/*<Typography variant="caption">Brush color</Typography>*/}
        </Box>
    );
}

export default ColorPickerTool;