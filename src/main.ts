import "./style.css";
import Cell from "./cell";
import { resizeCanvas,background,clearCanvas } from "./utils";

// Get the canvas element and its context
let canvas = resizeCanvas(document.getElementById("canvas") as HTMLCanvasElement);

let ctx = canvas.getContext("2d");

// Setup main parts
let cell = new Cell(100, 100, 20, "white", 1, ctx!);

// Main loop
function loop() {
  // Clear the canvas
  clearCanvas(ctx!, canvas);

  // cell.update();

  cell.display();

  requestAnimationFrame(loop);
}

loop();
