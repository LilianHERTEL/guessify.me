export default class MyPath{
    points = [];
    color = "black";
    thickness = 1;
    time = 1; //default 1sec
    constructor(points, color, thickness, time){
        this.points = points;
        this.color = color;
        this.thickness = thickness;
        this.time = time;
    }
}
