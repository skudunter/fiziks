import "./style.css";
import Cell from "./cell";
import Solver from "./solver";
import { resizeCanvas, background, clearCanvas, random } from "./utils";

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

// Setup main parts
let cells: Cell[] = [new Cell(WIDTH / 2, HEIGHT / 2, 20, "white", 1, ctx!)];
setInterval(() => {
  cells.push(new Cell(WIDTH / 2 + random(-170, 170), HEIGHT / 2 + random(-40, 40), 20, "white", 1, ctx!));
},CELLSPAWNSPEED);
let solver = new Solver(cells, canvas, ctx!);
let lastTime = 0;
let dt = 0;

// Main loop
function loop(timestamp: number) {
  // Calculate dt
  dt = (timestamp - lastTime) / 1000; // Convert to seconds
  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

  solver.update(dt);

  requestAnimationFrame(loop);
}

loop(0); // Start the loop
