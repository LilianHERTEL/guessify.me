import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Box, IconButton, Typography } from '@material-ui/core';

/**
 * brush size utils
 */
const BRUSH_SIZE_MAX = 100;
const BRUSH_SIZE_STEP = 1;
const BRUSH_SIZE_MIN = 1;
/** */

/**
 * setTimeout utils
 */
const CHANGE_INTERVAL_INITIAL = 400;
const CHANGE_INTERVAL_STEP = 100;
const CHANGE_INTERVAL_MIN = 20;
var timer;
var changeInterval = CHANGE_INTERVAL_INITIAL;
/** */

/**
 * SizingTool component
 * **
 * @PROPS
    * @param brushSize
    * @param setBrushSize Function
 */
const SizingTool = ({ brushSize, setBrushSize }) => {
  const localBrushSize = React.useRef(brushSize);

  const updateChangeInterval = (valueOff) => {
    if (changeInterval !== CHANGE_INTERVAL_MIN) {
      changeInterval > CHANGE_INTERVAL_MIN ? changeInterval -= valueOff : changeInterval = CHANGE_INTERVAL_MIN;
    }
  }

  const updateBrushSize = (value) => {
    setBrushSize(brushSize => brushSize + value);
    localBrushSize.current += value;
  }

  const runClickPlus = () => {
    localBrushSize.current < BRUSH_SIZE_MAX ? updateBrushSize(BRUSH_SIZE_STEP) : null;
    timer = setTimeout(runClickPlus, changeInterval);
    updateChangeInterval(CHANGE_INTERVAL_STEP);
  }

  const runClickMinus = () => {
    localBrushSize.current > BRUSH_SIZE_MIN ? updateBrushSize(-BRUSH_SIZE_STEP) : null;
    timer = setTimeout(runClickMinus, changeInterval);
    updateChangeInterval(CHANGE_INTERVAL_STEP);
  }
  const stopClick = () => {
    clearTimeout(timer);
    changeInterval = CHANGE_INTERVAL_INITIAL;
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" alignContent="center" alignItems="center" onMouseOut={stopClick}>
      <Box display="flex" flexDirection="row">
        <IconButton onMouseDown={runClickPlus} onMouseUp={stopClick} color="primary" size="small">
          <AddCircleIcon fontSize="large"></AddCircleIcon>
        </IconButton>
        <Box marginLeft={1} marginRight={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="caption">{brushSize}</Typography>
        </Box>
        <IconButton onMouseDown={runClickMinus} onMouseUp={stopClick} color="primary" size="small">
          <RemoveCircleIcon fontSize="large"></RemoveCircleIcon>
        </IconButton>
      </Box>
      <Typography variant="caption">Brush size</Typography>
    </Box>
  );
}

export default SizingTool;