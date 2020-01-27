import React from 'react';

import { CustomPicker, CirclePicker } from 'react-color';
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common';
import GuessifyPointer from './GuessifyPointer';
import { Box, Typography } from '@material-ui/core';
import GuessifySliderPointer from './GuessifySliderPointer';

export const GuessifyColorPicker = ({ hsv, rgb, hsl, onChange, oldColors }) => {
    

    return (
        <Box width={1} height={1} display="flex">
            <Box position="relative" width={0.1} height={1} className="slider">
                <Saturation
                    hsv={hsv}
                    rgb={rgb}
                    hsl={hsl}
                    onChange={onChange}
                    pointer={GuessifyPointer}
                />
            </Box>
            <Box mx={1}></Box>
            <Box width={0.9} height={1} display="flex" flexDirection="column" justifyContent="space-evenly" alignContent="center" alignItems="center">
                <Box position="relative" width={1} height="20px" className="slider">
                    <Hue
                        hsv={hsv}
                        rgb={rgb}
                        hsl={hsl}
                        onChange={onChange}
                        pointer={GuessifySliderPointer} />
                </Box>
                <Box position="relative" width={1} height="20px">
                    <CirclePicker
                    hsv={hsv}
                    rgb={rgb}
                    hsl={hsl}
                    onChange={onChange}
                    pointer={GuessifySliderPointer}
                    circleSize={20}
                    colors={oldColors}></CirclePicker>
                </Box>
                {/*
                <Box position="relative" width={1} height="20px" className="slider">
                    <Alpha
                        hsv={hsv}
                        rgb={rgb}
                        hsl={hsl}
                        onChange={onChange}
                        pointer={GuessifySliderPointer} />
                </Box>
                <Typography className="noselect" variant="caption">Brush color</Typography>
                */}
            </Box>
        </Box>
    )
}

export default CustomPicker(GuessifyColorPicker)



/*
import React from 'react';
import { CustomPicker } from 'react-color';
import { Hue } from 'react-color/lib/components/common';
import { Box, Grid } from '@material-ui/core';
import GuessifyPointer from './GuessifyPointer';

class MyColorPicker extends React.Component {

    handleChange() {

    }

    render() {
        return (
            <Box width={1} height={1} position="relative">
                <Alpha
                    rgb={rgb}
                    hsl={hsl}
                    onChange={onChange}
                    pointer={MyPointer}
                />
            </Box>
        );
    }
}

export default CustomPicker(MyColorPicker);
*/