import React from 'react';

import { Button, Paper, Box, Grid } from '@material-ui/core';
import ClearDrawingTool from './ClearDrawingTool';
import { HuePicker } from 'react-color';

import Option from './Option';
import SizingTools from './SizingTools';
import { OptionTypes } from './OptionTypes';
import SwitchBrushModeTool from './SwitchBrushModeTool';

/*
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles({
    drawingTool: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
});
*/

const DrawingTools = ({ socket, brushSize, brushColor, brushMode, handleChangeColor, handleChangeSize, handleChangeMode }) => {
    //const classes = useStyles();
    const [brushShape, setBrushShape] = React.useState("round"); // WIP

    const onChangeColor = (color, event) => {
        var obj = new Option(OptionTypes.COLOR, color);
        console.log("COLOR CHANGED : " + obj.getType());
        //socket.emit('drawingSideOption',color);
        handleChangeColor(color.hex);
        console.log("Changement de couleur pour : " + brushColor);
    }

    const onChangeSize = (value) => {
        handleChangeSize(value);
    }

    const onChangeMode = (value) => {
        console.log(value);
        handleChangeMode(value);
    }


    return (
        <Paper height="100%">
            <Box m={1}>
                <Grid container alignContent="center" alignItems="center" justify="space-evenly">
                    <ClearDrawingTool item xs={1} socket={socket}></ClearDrawingTool>
                    <HuePicker
                        item
                        xs={1}
                        color={brushColor}
                        onChange={onChangeColor}
                    />
                    <SwitchBrushModeTool item xs={1} socket={socket} brushColor={brushColor} brushMode={brushMode} onChangeMode={onChangeMode}></SwitchBrushModeTool>
                    {/*<BlackWhiteColorPicker onValueChanged={handleChangeComplete}  className={classes.blackWhite} onChange={handleChangeComplete} onChangeComplete={ handleChangeComplete }/>*/}
                    <SizingTools item xs={1} brushSize={brushSize} brushColor={brushColor} onChangeSize={onChangeSize} />
                </Grid>
            </Box>
        </Paper>
    )
}

export default DrawingTools;