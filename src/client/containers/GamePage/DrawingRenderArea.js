import React, { useRef, useEffect,useReducer } from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import MyPath from './MyPath';

var path;
var ancienTemps = Date.now();
var pathsArray = [];
class Point { x = 0; y = 0; }
var isRendering = false;

const DrawingRenderArea = ({socket}) => {
    //liste de paths qui sont actuellement affichés à l'écran 
    const [listPath,setListPath] = React.useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    
    //liste de paths en attente d'affichage


    useEffect(() => {
        if (socket == null) return;
        socket.on('drawCmd', async function(data){
            pathsArray = [...pathsArray,data];
            console.log("//////// VIEWER DATA : " + JSON.stringify(data));
            setListPath(path=>{
                if(path.length == 0 || path[path.length-1].id != data.id){
                    if(path.length != 0) console.log("adding new Path : " + path[path.length-1].id + " : " + data.id);
                    return [...path,new MyPath([], data.color, data.thickness, data.time,data.id)];
                    
                }
                else{
                    console.log("NOT adding new Path : " + path[path.length-1].id + " : " + data.id);
                    return [...path];
                    
                }
            });
                
            if(!isRendering)
                await displayPathsArray();
            else
                console.log("IS RENDERING : TRUE");
            
        });
      }, [socket]);

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const fctQuiAjouteUnParUn = (myPath) => {

        var {x,y} = myPath.points.shift();
        setListPath(listpath => 
            {
                if(listpath.length === 0) return [];
                listpath[listpath.length -1].points.push({x,y});
                return listpath;
            });
        forceUpdate();

    }

    const displayPathsArray = async () => {
        isRendering = true;
        while(pathsArray.length > 0) {
            let time = pathsArray[0].time;
            let nbPoints = pathsArray[0].points.length;
            for(var i=0;i<nbPoints;i++){
                fctQuiAjouteUnParUn(pathsArray[0]);
                
                await sleep((time*1000)/nbPoints);
                
            }
            pathsArray.shift();
        }
        isRendering = false;
    }

    // The smoothing ratio
    const smoothing = 0.2

    // Properties of a line 
    // I:  - pointA (array) [x,y]: coordinates
    //     - pointB (array) [x,y]: coordinates
    // O:  - (object) { length: l, angle: a }: properties of the line
    const line = (pointA, pointB) => {
        const lengthX = pointB.x - pointA.x
        const lengthY = pointB.y - pointA.y
        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
        }
    }

    // Position of a control point 
    // I:  - current (array) [x, y]: current point coordinates
    //     - previous (array) [x, y]: previous point coordinates
    //     - next (array) [x, y]: next point coordinates
    //     - reverse (boolean, optional): sets the direction
    // O:  - (array) [x,y]: a tuple of coordinates
    const controlPoint = (current, previous, next, reverse) => {
        // When 'current' is the first or last point of the array
        // 'previous' or 'next' don't exist.
        // Replace with 'current'
        const p = previous || current;
        const n = next || current;

        // Properties of the opposed-line
        const o = line(p, n);

        // If is end-control-point, add PI to the angle to go backward
        const angle = o.angle + (reverse ? Math.PI : 0);
        const length = o.length * smoothing;

        // The control point position is relative to the current point
        const x = current.x + Math.cos(angle) * length;
        const y = current.y + Math.sin(angle) * length;
        return [x, y];
    }

    // Create the bezier curve command 
    // I:  - point (array) [x,y]: current point coordinates
    //     - i (integer): index of 'point' in the array 'a'
    //     - a (array): complete array of points coordinates
    // O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
    const bezierCommand = (point, i, a) => {

    // start control point
    const cps = controlPoint(a[i - 1], a[i - 2], point)

    // end control point
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point.x},${point.y}`
    }

    // Render the svg <path> element 
    // I:  - points (array): points coordinates
    //     - command (function)
    //       I:  - point (array) [x,y]: current point coordinates
    //           - i (integer): index of 'point' in the array 'a'
    //           - a (array): complete array of points coordinates
    //       O:  - (string) a svg path command
    // O:  - (string): a Svg <path> element
    const svgPath = (points, command) => {
    // build the d attributes by looping over the points
    const d = points.reduce((acc, point, i, a) => i === 0
        ? `M ${point.x},${point.y}`
        : `${acc} ${command(point, i, a)}`
        , '')
        return `${d}`
    }

    return (
        <Paper className="canvas fullHeight">
         
            
            <svg className="fullHeight" width="100%">
                {listPath.map((MyPath,index) => <path d={svgPath(MyPath.points,bezierCommand)} key={index} fill="none" stroke={MyPath.color} stroke-width={MyPath.thickness}></path>)}
            </svg>         
        </Paper>
    );
}

export default DrawingRenderArea;