import "./style.css";
import Cell from "./cell";
import Solver from "./solver";
import Link from "./link";
import { resizeCanvas, clearCanvas, random, getRandomColor } from "./utils";

// Get the canvas element and its context
let canvas = resizeCanvas(
  document.getElementById("canvas") as HTMLCanvasElement
);
let ctx = canvas.getContext("2d");

// Constants
const NUMCELLS = 100;
const CELLSPAWNSPEED = 1000;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Setup main components
let solver = new Solver(WIDTH, HEIGHT, ctx!);
let lastTime = 0;
let dt = 0;
let square = solver.addSquare(100, 100, 100, "red");
let circle = solver.addCircle(300, 300, 50, "blue");
let rect = solver.addRectangle(400, 400, 100, 50, "green");

// Main loop
function loop(timestamp: number) {
  dt = (timestamp - lastTime) / 1000;

  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

  solver.update(dt);
  requestAnimationFrame(loop);
}

// on mouse click, spawn a cell
canvas.addEventListener("click", (e) => {
  rect.applyForce({ x: 100, y: 100 });
});

loop(0);
