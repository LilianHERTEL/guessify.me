import React from 'react';
import './style.css';
import { Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyPath from './MyPath';
import DrawingComponentV2 from './DrawingComponentV2';


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



const DrawingAreaV2 = ({ socket, brushSize, brushColor, brushMode, updateOldColors }) => {
    const [listPath, setListPath] = React.useState([]);
    const workingPath = React.useRef(new MyPath([], "#000000", 5));
    const isDrawing = React.useRef(false);
    const hasDrawn = React.useRef(false);


    const timePassed = React.useRef(0.0);
    const drawingZoneRef = React.useRef(null);


    /****************************************************************************/
    /****************************************************************************/
    /* SVG AREA SIZING UTILS
     *
     * Used to initialize and update responsive svg area size (height)
     */
    const [svgBoxHeight, setSvgBoxHeight] = React.useState(0);
    const [svgBoxWidth, setSvgBoxWidth] = React.useState(0);
    /**
     * (Hook version of "componentDidMount" lifecycle method)
     * **
     * This effect is executed only once : after the component has mounted
     * **
     * Sets the initial drawing area size
     */
    React.useEffect(() => {
        console.log("DrawingArea MOUNTED");
        // Sets the initial drawing area size
        const w = document.getElementById('svgArea').clientWidth;
        const h = w / 1060 * 582;
        setSvgBoxHeight(h);
        setSvgBoxWidth(w);
    }, []);

    /**
     * Updates drawing area size on resize event
     */
    window.onresize = () => {
        const newWidth = document.getElementById('svgArea').clientWidth;
        const newHeight = newWidth / 1060 * 582;
        setSvgBoxHeight(newHeight);
        setSvgBoxWidth(newWidth);
    }
    /****************************************************************************/
    /****************************************************************************/


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
            //setListPath([]); OLD MECANICS
            
            if(drawingZoneRef.current != null) drawingZoneRef.current.clear();
        });
    }, [socket]);
    /************************************/

    React.useEffect(() => {
        timePassed.current;
        const interval = setInterval(() => {
            secondCheck(socket);
        }, 500);
        return () => clearInterval(interval);
    }, [socket]);

    /**
     * secondCheck est une fonction appelée toutes les secondes, c'est ce qui est appelé
     */
    function secondCheck(socket) {

        //console.log('This will run every second!  : ' + isDrawing.current);
        if (isDrawing.current)
            emitPathToServ(socket);
    }

    /**
     * Permet d'emettre ce que l'on a dessiner au serveur
     */
    function emitPathToServ(socket) {
        var tmp = new Date(Date.now() - timePassed.current);
        workingPath.current.time = tmp.getTime() / 1000;
        timePassed.current = Date.now();
        
        // On désyncronise l'envoie des informations de dessin car sinon ça bloque l'algorithme 
        let promis = new Promise(function (resolve, reject) {
            //console.log("EMITTING id : " + drawingZoneRef.current);
            //socket.emit('draw', workingPath.current);
            //if(drawingZoneRef.current != null) console.log("DATA TO EMMIT : " + JSON.stringify(drawingZoneRef.current.getSaveData()));
            socket.emit('draw',drawingZoneRef.current.getSaveData());
        });

        //workingPath.current = new MyPath([], (brushMode === 'Erase') ? '#FFFFFF' : brushColor, brushSize, 1, workingPath.current.id);
        
    }

    function release(e){
        //console.log("RELEASEEEEEEEEEEEEE ! ");
        emitPathToServ(socket);
    }

    function onMyTouchEnd(event){
        isDrawing.current = false;
        return false;
    }

    return (
        <Box height={svgBoxHeight} mb={1} onTouchStart={(e)=>onMyTouchEnd(e)}>
            <Paper className="fullHeight" onTouchStart={(e)=>onMyTouchEnd(e)}>
                <DrawingComponentV2 isDrawing={isDrawing} release={(e) => release(e)} ref={canvasDraw => (drawingZoneRef.current = canvasDraw)} id="canvas-id" className="drawingArea" brushColor={brushColor} brushRadius={brushSize} canvasWidth={svgBoxWidth} canvasHeight={svgBoxHeight} />
            </Paper>
        </Box>
    );
}
export default DrawingAreaV2;