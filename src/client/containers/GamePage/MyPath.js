export default class MyPath{
    id=0;
    points = [];
    color = "black";
    thickness = 1;
    time = 1; //default 1sec
    constructor(points, color, thickness, time,id){
        this.points = points;
        this.color = color;
        this.thickness = thickness;
        this.time = time;
        this.id = id;
    }
}
