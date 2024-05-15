import "./style.css";
import Cell from "./cell";
import { resizeCanvas,background,clearCanvas } from "./utils";

// Get the canvas element and its context
let canvas = resizeCanvas(document.getElementById("canvas") as HTMLCanvasElement);
let ctx = canvas.getContext("2d");

// Setup main parts
let cell = new Cell(500, 500, 20, "white", 1, ctx!);
let lastTime = 0;
let dt = 0;

// Main loop
function loop(timestamp:number) {
  // Calculate dt
  dt = (timestamp - lastTime) / 1000; // Convert to seconds
  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

 
  cell.update(dt);
  cell.display();

  requestAnimationFrame(loop);
}

loop(0); // Start the loop

