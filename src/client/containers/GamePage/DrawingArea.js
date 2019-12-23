import React from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyPath from './MyPath';
import { HuePicker } from 'react-color';
import Option from './Option';
import { OptionTypes } from './OptionTypes';
import BlackWhiteColorPicker from './BlackWhiteColorPicker';
import SizingTools from './SizingTools';
var path;
var ancienTemps = Date.now();

class Point { x = 0; y = 0; }

const useStyles = makeStyles(theme => ({
    container: {
        background: "whitesmoke"
    },
    blackWhite: {
        margin: "5%"
    }
}));



const DrawingArea = ({ socket, brushSize, brushColor, brushMode }) => {
    const [ancienPoint, setAncienPoint] = React.useState(new Point());
    const [actuelPoint, setActuelPoint] = React.useState(new Point());
    const [mousep, setMouse] = React.useState({ x: 0, y: 0 });
    const [dessine, setDessine] = React.useState(false);
    const [distance, setDistance] = React.useState(0.0);
    const [listPath, setListPath] = React.useState([]);
    const workingPath = React.useRef(new MyPath([], "#000000", 5));
    const isDrawing = React.useRef(false);
    const timePassed = React.useRef(0.0);
    const ActualColor = React.useRef("#000000");
    const ActualSize = React.useRef(5);

    /************************************
     * (Hook version of "componentDidMount" lifecycle method)
     * **
     * This effect is executed only once : after the component has mounted
     */
    const [componentIsMounted, setComponentIsMounted] = React.useState(false);

    React.useEffect(() => {
        setComponentIsMounted(true);
        console.log("DrawingArea MOUNTED");
    }, []);
    /************************************/

    /************************************
     * Handles the drawing clear effect
     * **
     * Sets listPath empty
     * Sets clearer in gamePage to false (via handleAfterClear)
     */
    React.useEffect(() => {
        if (socket == null) return;
        socket.on('clearDrawing', () => {
            //console.log("CLEARING DrawingArea");
            setListPath([]);
        });
    }, [socket]);
    /************************************/

    var distanceMiniAvantCreation = 0;
    var distanceMaxAvantCreation = 0;
    let mouse = { x: 0, y: 0 };
    var ecartTemps = 50;

    React.useEffect(() => {
        timePassed.current;
        const interval = setInterval(() => {
            secondCheck(socket);
        }, 1000);
        return () => clearInterval(interval);
    }, [socket]);

    /**
     * secondCheck est une fonction appelée toutes les secondes, c'est ce qui est appelé
     */
    function secondCheck(socket) {

        //console.log('This will run every second!');
        if (!isDrawing.current) return;
        emitPathToServ(socket);
    }

    /**
     * Permet d'emettre ce que l'on a dessiner au serveur
     */
    function emitPathToServ(socket) {
        //console.log(socket)
        //console.log("ENVOIES EN MODE DESSIN : " + isDrawing.current + "  ///  " + (workingPath.current.points));

        if (workingPath.current === null || workingPath.current.points.length === 0) return;
        var tmp = new Date(Date.now() - timePassed.current);
        workingPath.current.time = tmp.getTime() / 1000;

        timePassed.current = Date.now();
        socket.emit('draw', workingPath.current);
        workingPath.current = new MyPath([], (brushMode === 'Erase') ? 'white' : brushColor, brushSize, 1, workingPath.current.id);
        //console.log("[INFO] : Em");
    }


    function estPointAZero(point) {
        return (point.x === 0 && point.y === 0) ? true : false;
    }

    function distanceBtw(pointA, pointB) {
        return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow(pointA.y - pointB.y, 2));
    }

    function onMouseMove(event) {
        setMouse({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });

        if (estPointAZero(ancienPoint)) {
            setAncienPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        }
        setActuelPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
        setDistance(distanceBtw(ancienPoint, actuelPoint));

        if (((((Date.now() - ancienTemps) > ecartTemps) && distance > distanceMiniAvantCreation)) && dessine) {
            ancienTemps = Date.now();
            setAncienPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });

            listPath[listPath.length - 1].points.push({ x: actuelPoint.x, y: actuelPoint.y });
            setListPath(listPath);
            workingPath.current.points.push({ x: actuelPoint.x, y: actuelPoint.y });

        }
    }



    function onMouseDown(event) {
        isDrawing.current = true;
        timePassed.current = Date.now();
        setDessine(true);
        console.log("ON MOUSE DOWN = ");
        var endPath = new MyPath([{ x: actuelPoint.x, y: actuelPoint.y }], (brushMode === 'Erase') ? 'white' : brushColor, brushSize);
        endPath.points.push({ x: actuelPoint.x, y: actuelPoint.y });
        setListPath([...listPath, endPath]);
        workingPath.current = new MyPath([], (brushMode === 'Erase') ? 'white' : brushColor, brushSize, 1, (workingPath.current.id == null) ? 0 : workingPath.current.id + 1);
        workingPath.current.points.push({ x: actuelPoint.x, y: actuelPoint.y });
        workingPath.current.points.push({ x: actuelPoint.x, y: actuelPoint.y });
    }

    function onMouseDrag(event) {
        console.log("ON MOUSE DRAG");
    }

    function onMouseUp(event) {
        isDrawing.current = false;
        console.log("ON MOUSE UP");

        var thepath =new MyPath([{x:actuelPoint.x,y:actuelPoint.y}],"black",2,0,0,false);
        thepath.points.push({x:actuelPoint.x,y:actuelPoint.y});
        setListPath([...listPath,thepath]);

        workingPath.current.points.push({x:actuelPoint.x,y:actuelPoint.y});
        workingPath.current.points.push({x:actuelPoint.x,y:actuelPoint.y});

        emitPathToServ(socket);
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

        if (x < 20 && y < 20) {
            console.log("x = " + x + " y = " + y);
        }

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

    /*
    const handleChangeComplete = (color, event) => {
        var obj = new Option(OptionTypes.COLOR, color);
        console.log("COLOR CHANGED : " + obj.getType());
        //socket.emit('drawingSideOption',color);
        (brushMode === 'Erase') ? 'white' : brushColor = color.hex;
        console.log("Changement de couleur pour : " + (brushMode === 'Erase') ? 'white' : brushColor);
    }
    const handleChangeSizePlus = () => {
        brushSize += 5;
        console.log("Size + : " + brushSize);
    }

    const handleChangeSizeMinus = () => {
        brushSize -= 5;
        console.log("Size - : " + brushSize);
    }
    */

    return (
        <Paper height="100%" className="canvas"
            onMouseDown={(e) => onMouseDown(e)}
            onMouseUp={(e) => onMouseUp(e)}
            onMouseMove={(e) => onMouseMove(e)}
        >
            <svg height="100%" width="100%">
                {
                    listPath.map((MyPath, index) => <path d={svgPath(MyPath.points, bezierCommand)} key={index} fill="none" stroke={MyPath.color} strokeWidth={MyPath.thickness} strokeLinecap="round"></path>)
                }
            </svg>
        </Paper>
    );
}

export default DrawingArea;


/*
<div style={{width:"100%"}}>
            <Paper height="100%" className="canvas"
            onMouseDown={(e) => onMouseDown(e)}
            onMouseUp={(e) => onMouseUp(e)}
            onMouseMove={(e) => onMouseMove(e)}
            >
                <svg height="100%" width="100%">
                    {listPath.map((MyPath,index) => <path d={svgPath(MyPath.points,bezierCommand)} key={index} fill="none" stroke={MyPath.color} stroke-width={MyPath.thickness}></path>)}
                </svg>
            </Paper>
            <Grid className={classes.container} container direction="row">
                <HuePicker width="80%"
                    color={(brushMode==='Erase')?'white':brushColor}
                    onChangeComplete={ handleChangeComplete }
                />
                <BlackWhiteColorPicker onValueChanged={handleChangeComplete}  className={classes.blackWhite} onChange={handleChangeComplete} onChangeComplete={ handleChangeComplete }/>
                <SizingTools onClickPlus={handleChangeSizePlus} onClickMinus={handleChangeSizeMinus} />
            </Grid>

        </div>
*/

/**
 * CURSOR TEST
 {
    <circle cx={mousep.x} cy={mousep.y} r={brushSize / 2} fill="none" stroke="red"></circle>
    <line x1={mousep.x - brushSize / 8} x2={mousep.x - brushSize / 8 + brushSize / 4} y1={mousep.y} y2={mousep.y} strokeWidth="1" stroke="red"></line>
    <line x1={mousep.x} x2={mousep.x} y1={mousep.y - brushSize / 8} y2={mousep.y - brushSize / + brushSize / 2} strokeWidth="1" stroke="red"></line>
}
 */