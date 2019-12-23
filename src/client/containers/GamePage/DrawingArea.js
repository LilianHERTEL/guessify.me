import React from 'react';
import './style.css';
import { Paper, Grid, Box, Container, LinearProgress, Typography, AppBar, Tabs, Tab, Divider, Switch, TextField, ListItemSecondaryAction } from '@material-ui/core';
import MyPath from './MyPath';

var path;
var ancienTemps = Date.now();

class Point { x = 0; y = 0; }



const DrawingArea = ({socket, clearer, handleAfterClear}) => {
    const [ancienPoint, setAncienPoint] = React.useState(new Point());
    const [actuelPoint, setActuelPoint] = React.useState(new Point());
    const [mousep, setMouse] = React.useState({ x: 0, y: 0 });
    const [dessine, setDessine] = React.useState(false);
    const [distance, setDistance] = React.useState(0.0);
    const [listPath,setListPath] = React.useState([]);
    const workingPath = React.useRef(new MyPath([],'black',3, 0, 0, false));
    const isDrawing = React.useRef(false);
    const timePassed = React.useRef(0.0);
    const [thickness, setThickness] = React.useState(30);

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
        console.log("CLEARING DrawingArea");
        if (!componentIsMounted) {
            return;
        }
        setListPath([]);
        handleAfterClear();
    }, [clearer]);
    /************************************/

    var distanceMiniAvantCreation = 0;
    var distanceMaxAvantCreation = 0;
    let mouse = { x: 0, y: 0 };
    var ecartTemps = 0;    

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
    function secondCheck(socket){
        
        //console.log('This will run every second!');
        if(!isDrawing.current) return;
        emitPathToServ(socket);
    }

    /**
     * Permet d'emettre ce que l'on a dessiner au serveur
     */
    function emitPathToServ(socket){
        //console.log(socket)
        //console.log("ENVOIES EN MODE DESSIN : " + isDrawing.current + "  ///  " + (workingPath.current.points));
        
        if(workingPath.current === null || workingPath.current.points.length === 0 ) return;
        var tmp = new Date(Date.now() - timePassed.current);
        workingPath.current.time = tmp.getTime()/1000;
        
        timePassed.current = Date.now();
        socket.emit('draw',workingPath.current);
        workingPath.current = new MyPath([],'black',3,1,workingPath.current.id, false);
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

        if (((((Date.now() - ancienTemps) > ecartTemps) && distance > distanceMiniAvantCreation) ) && dessine) {
            ancienTemps = Date.now();
            setAncienPoint({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });

            listPath[listPath.length -1].points.push({x:actuelPoint.x,y:actuelPoint.y});
            setListPath(listPath);
            workingPath.current.points.push({x:actuelPoint.x,y:actuelPoint.y});
            
        }
    }

    

    function onMouseDown(event) {
        isDrawing.current = true;
        timePassed.current = Date.now();
        setDessine(true);
        console.log("ON MOUSE DOWN = ");
        var thepath =new MyPath([{x:actuelPoint.x,y:actuelPoint.y}],"black",2,0,0,false);
        //thepath.points.push({x:actuelPoint.x,y:actuelPoint.y});
        setListPath([...listPath,thepath]);
        workingPath.current = new MyPath([],"black",3,1,(workingPath.current.id == null)? 0 : workingPath.current.id+1, false);

        /*
        workingPath.current.points.push({x:actuelPoint.x,y:actuelPoint.y});
        workingPath.current.points.push({x:actuelPoint.x,y:actuelPoint.y});
        */

        //emitPathToServ(socket);
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
        const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
        return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point.x},${point.y}`;
    }

    /**
     * Fonction pour faire un svg circle avec path
     * N'est pas utilisée ici
     *
    const circleCommand = (point) => {
        return `M ${point.x} ${point.y}
            m ${-thickness/3}, 0
            a ${thickness/8},${thickness/8} 0 1,0 ${thickness/2},0
            a ${thickness/8},${thickness/8} 0 1,0 ${-thickness/2},0`;
    }
     */

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
            , ''
        );
        return `${d}`
    }

    return (
        <Paper height="100%" className="canvas"
        onMouseDown={(e) => onMouseDown(e)}
        onMouseUp={(e) => onMouseUp(e)}
        onMouseMove={(e) => onMouseMove(e)}
        >
            <svg height="100%" width="100%">
                {/*hasDrawn?<circle cx={listPath[listPath.length-1].points[listPath[listPath.length-1].points.length-1].x} cy={listPath[listPath.length-1].points[listPath[listPath.length-1].points.length-1].y} r={thickness/2}></circle>:null*/}
                {
                    listPath.map((MyPath,index) => {
                            /*if (MyPath.isCircle===false) {*/
                                return <path d={svgPath(MyPath.points, bezierCommand)} key={index} fill="none" stroke="black" strokeWidth={thickness} strokeLinecap="round"></path>
                            /*}
                            else {
                                //console.log("JE DESSINE UN CERCLE !");
                                return <circle cx={MyPath.points[0].x} cy={MyPath.points[0].y} key={index}  r={thickness/2} fill="black"></circle>
                                //return <path d={svgPath(MyPath.points, circleCommand)} key={index} fill="none" stroke="black" strokeWidth={thickness/2}></path>
                            }*/
                        }
                    )
                }
            </svg>
        </Paper>


    );
    //
    


}

export default DrawingArea;
