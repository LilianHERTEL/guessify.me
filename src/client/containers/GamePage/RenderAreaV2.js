import React, { useRef, useEffect, useReducer } from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import MyPath from './MyPath';
import {controlPoint,line,bezierCommand,svgPath} from './BezierTools';

var path;
var ancienTemps = Date.now();
var pathsArray = [];
class Point { x = 0; y = 0; }
var isRendering = false;

const RenderAreaV2 = (props) => {

    const [svgBoxWidth, setSvgBoxWidth] = React.useState(0);
    const [svgBoxHeight, setSvgBoxHeight] = React.useState(0);
    window.onresize = () => {
        const oldWidth = svgBoxWidth;
        const oldHeight = svgBoxHeight;
        const newWidth = document.getElementById('svgArea').clientWidth;
        const newHeight = newWidth / 1168 * 617.817;
        setSvgBoxWidth(newWidth);
        setSvgBoxHeight(newHeight);
    }

    return (
        <Box mt={1} height={svgBoxHeight}>
            <Paper className="fullHeight">
                <svg
                    id="mySvg"
                    className="drawingRenderArea"
                    viewBox={`0 0 ${1168} ${617.817}`}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    baseProfile="full"
                    preserveAspectRatio="xMidYMid">
                    {
                        props.listPath.map((MyPath, index) => <path d={svgPath(MyPath.points, bezierCommand)} key={index} fill="none" stroke={MyPath.color} strokeWidth={MyPath.thickness} strokeLinecap="round"></path>)
                    }
                </svg>
            </Paper>
        </Box>
    );
}

export default RenderAreaV2;
