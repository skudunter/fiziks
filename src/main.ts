import "./style.css";
import Cell from "./cell";
import Solver from "./solver";
import { resizeCanvas, clearCanvas, random, getRandomColor} from "./utils";

// Get the canvas element and its context
let canvas = resizeCanvas(
  document.getElementById("canvas") as HTMLCanvasElement
);
let ctx = canvas.getContext("2d");

// Constants
const NUMCELLS = 100;
const CELLSPAWNSPEED =1000;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Setup main components
let cells: Cell[] = [];
setInterval(() => {
  cells.push(new Cell(WIDTH / 2+10, HEIGHT / 2-320 , random(10,20),getRandomColor(),1,0.99, ctx!));
  cells[cells.length-1].applyForce({x:random(-200,200),y:random(-200,100)});
},CELLSPAWNSPEED);
let solver = new Solver(cells,WIDTH,HEIGHT, ctx!);
let lastTime = 0;
let dt = 0;

// Main loop
function loop(timestamp: number) {
  dt = (timestamp - lastTime) / 1000;
  
  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

  solver.update(dt);

  requestAnimationFrame(loop);
}

loop(0); 
