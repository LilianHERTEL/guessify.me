import React from 'react';
import { OptionTypes } from './OptionTypes';
import { Box, Typography } from '@material-ui/core';
import { HuePicker } from 'react-color';

const ColorPickerTool = ({ brushColor, setBrushColor, setBrushMode }) => {

    const onChangeColor = (color, event) => {
        var obj = new Option(OptionTypes.COLOR, color);
        //console.log("COLOR CHANGED : " + obj.getType());
        //socket.emit('drawingSideOption',color);
        setBrushColor(color.hex);
        setBrushMode('Draw');
        //console.log("Changement de couleur pour : " + brushColor);
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="space-between" alignContent="center" alignItems="center" height="4em">
            <Box></Box>
            <Box display="flex" flexDirection="row">
                <HuePicker
                disableAlpha={true}
                    item
                    xs={1}
                    color={brushColor}
                    onChange={onChangeColor}
                />
            </Box>
            <Typography variant="caption">Brush color</Typography>
        </Box>
    );
}

export default ColorPickerTool;