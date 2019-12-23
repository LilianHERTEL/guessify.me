import React from 'react';
import { CustomPicker } from 'react-color';
import { Button, Grid, Box, Typography, IconButton } from '@material-ui/core';
import { Icon, InlineIcon } from '@iconify/react';
import circleIcon from '@iconify/icons-mdi/circle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const step = 1;

var timer;

var test = 0;

const SizingTools = ({ brushSize, brushColor, onChangeSize }) => {

  /*
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked(type) {
    switch (type) {
      case "plus":
        break;
      case "minus":
        break;
      default:
        console.log("error");
    }
    console.log("clicked !! !! ! !");
  }
  */

  const runClickPlus = () => {
    onChangeSize(step);
    //console.log("PLUS");
    //timer = setTimeout(runClickPlus, 500);
  }
  const stopClickPlus = () => {
    clearTimeout(timer);
  }

  const runClickMinus = () => {
    onChangeSize(-step);
    //console.log("MINUS");
    //timer = setTimeout(runClickMinus, 500);
  }
  const stopClickMinus = () => {
    clearTimeout(timer);
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
      <Box display="flex" flexDirection="row">
        <IconButton onClick={runClickPlus} color="primary" size="small">
          <AddCircleIcon fontSize="large"></AddCircleIcon>
        </IconButton>
        <Box marginLeft={1} marginRight={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {/*<Icon icon={circleIcon} width={brushSize} color={brushColor}></Icon>*/}
          <Typography variant="caption">{brushSize}</Typography>
        </Box>
        <IconButton onClick={runClickMinus} color="primary" size="small">
          <RemoveCircleIcon fontSize="large"></RemoveCircleIcon>
        </IconButton>
      </Box>
      <Typography variant="caption">Brush size</Typography>
    </Box>
  );
}

export default CustomPicker(SizingTools);