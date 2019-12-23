import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import eraserIcon from '@iconify/icons-mdi/eraser';
import brushIcon from '@iconify/icons-mdi/brush';
import { Button, IconButton, Box, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const SwitchBrushModeTool = ({ brushColor, brushMode, onChangeMode }) => {
    var brushColorRGB = hexToRgb(brushColor);

    const useStyles = makeStyles({
        modeSelected: {
            //transition: '0.5s',
            backgroundColor: `rgba(${brushColorRGB.r}, ${brushColorRGB.g}, ${brushColorRGB.b},0.1)`,
            borderRadius: '25%',
            pointerEvents: 'none',
        },
    });

    const onDrawModeClick = () => {
        if (brushMode !== 'Draw') {
            onChangeMode('Draw');
        }
    }

    const onEraseModeClick = () => {
        if (brushMode !== 'Erase') {
            onChangeMode('Erase');
        }
    }

    const classes = useStyles();
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignContent="center" alignItems="center">
            <Box display="flex" flexDirection="row">
                <IconButton onClick={onDrawModeClick} size="small" className={brushMode === 'Draw' ? classes.modeSelected : null}>
                    <Icon icon={brushIcon} color={brushColor} width="2em" />
                </IconButton>
                <Box marginLeft={1} marginRight={1}></Box>
                <IconButton onClick={onEraseModeClick} size="small" className={brushMode === 'Erase' ? classes.modeSelected : null}>
                    <Icon icon={eraserIcon} color="grey" width="2em" />
                </IconButton>
            </Box>
            <Typography variant="caption">{brushMode} mode</Typography>
        </Box>
    )
}

export default SwitchBrushModeTool;