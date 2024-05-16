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
const CELLSPAWNSPEED =100;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Setup main parts
let cells: Cell[] = [];
setInterval(() => {
  cells.push(new Cell(WIDTH / 2+320, HEIGHT / 2-100 , random(10,20),getRandomColor(), 1, ctx!));
},CELLSPAWNSPEED);
let solver = new Solver(cells, canvas, ctx!);
let lastTime = 0;
let dt = 0;

// Main loop
function loop(timestamp: number) {
  // Calculate dt
  dt = (timestamp - lastTime) / 1000; // Convert to seconds
  console.log(dt*dt);
  
  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

  solver.update(dt);

  requestAnimationFrame(loop);
}

loop(0); // Start the loop
