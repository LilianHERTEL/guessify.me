import React from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';

var path;
var ancienTemps = Date.now();

class Point { x = 0; y = 0; }
class MyPath{
    points = [];
    color = "black";
    thickness = 1;
    constructor(points,couleur,thickness){
        this.points = points;
        this.color = this.color;
        this.thickness = thickness;
    }
}


export default function DrawingArea(){

    const [ancienPoint, setAncienPoint] = React.useState(new Point());
    const [actuelPoint, setActuelPoint] = React.useState(new Point());
    const [mousep, setMouse] = React.useState({ x: 0, y: 0 });
    const [dessine, setDessine] = React.useState(false);
    const [distance, setDistance] = React.useState(0.0);
    const [listPath,setListPath] = React.useState([]);
    
    const [offset, setOffset] = React.useState(0.0);

    var distanceMiniAvantCreation = 5;
    var distanceMaxAvantCreation = 20;
    let mouse = { x: 0, y: 0 };
    var ecartTemps = 50;

    function estPointAZero(point) {
        return (point.x === 0 && point.y === 0) ? true : false;
    }

    function distanceBtw(pointA, pointB) {
        return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow(pointA.y - pointB.y, 2));
    }

    function onMouseMove(event) {

        setMouse({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        //console.log("MOUSE MOVE " + event.nativeEvent.offsetX + " " + event.nativeEvent.offsetY);
        //console.log("ON MOUSE DOWN " + ancienPoint.x);
        if (estPointAZero(ancienPoint)) {
            setAncienPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        }
        setActuelPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        setDistance(distanceBtw(ancienPoint, actuelPoint));
        //|| distance > distanceMaxAvantCreation
        if (((((Date.now() - ancienTemps) > ecartTemps) && distance > distanceMiniAvantCreation) ) && dessine) {
            ancienTemps = Date.now();
            setAncienPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
            console.log("CREATION POINT + date : " + (Date.now()-ancienTemps));

            console.log(listPath[listPath.length-1].points.push({x:actuelPoint.x,y:actuelPoint.y}));

            setListPath(listPath);
        }
    }

    

    function onMouseDown(event) {
        console.log("ON MOUSE DOWN");
        setListPath([...listPath,new MyPath([{x:actuelPoint.x,y:actuelPoint.y}],"black",2)])
        setDessine(true);
    }

    function onMouseDrag(event) {
        console.log("ON MOUSE DRAG");
    }

    function onMouseUp(event) {
        console.log("ON MOUSE UP");
        setDessine(false);
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
    const p = previous || current
    const n = next || current

    // Properties of the opposed-line
    const o = line(p, n)

    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing

    // The control point position is relative to the current point
    const x = current.x + Math.cos(angle) * length
    const y = current.y + Math.sin(angle) * length
    return [x, y]
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
        <React.Fragment>
            <Box display="flex" className="fullHeight">
                <Paper className="canvas fullHeight"
                onMouseDown={(e) => onMouseDown(e)}
                onMouseDrag={(e) => onMouseDrag(e)}
                onMouseUp={(e) => onMouseUp(e)}
                onMouseMove={e => onMouseMove(e)}>
                    <svg className="fullHeight" width="100%">
                        {listPath.map(MyPath => <path d={svgPath(MyPath.points,bezierCommand)}  fill="none" stroke="black" ></path>)}
                    </svg>        
                </Paper>
                <Paper className="canvas fullHeight">
                    <svg className="fullHeight" width="100%">
                        {listPath.map(MyPath => <path d={svgPath(MyPath.points,bezierCommand)} fill="none" stroke="black" strokeDasharray={offset}></path>)}
                    </svg>        
                </Paper>
            </Box>
            
        </React.Fragment>
        


    );
    //
    


}