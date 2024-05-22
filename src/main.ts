import "./style.css";
import Cell from "./cell";
import {
  resizeCanvas,
  clearCanvas,
  getRandomColor,
  random,
  ZERO,
  GUI
} from "./utils";
import Link from "./link";
import Fiziks from "./fiziks";

// Get the canvas element and its context
let canvas = resizeCanvas(
  document.getElementById("canvas") as HTMLCanvasElement
);
let ctx = canvas.getContext("2d");
let gui = new GUI();

// Constants
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
let isMouseDown = false;
let mousePos = ZERO;
let fps = 0;

// Setup main components
let solver = new Fiziks(WIDTH, HEIGHT, ctx!);
let lastTime = 0;
let dt = 0;
let rect = solver.addRectangle(WIDTH / 2, 300, 100, 100, getRandomColor());
let cells = [
  new Cell(WIDTH / 2, 100, 20, getRandomColor(), 1, 1, ctx!, true),
  new Cell(WIDTH / 2 + 30, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 50, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 10, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 40, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 60, 200, 20, getRandomColor(), 10, 1, ctx!),
];
let links = [
  new Link(cells[0], cells[1], 100, ctx!),
  new Link(cells[1], cells[2], 100, ctx!),
  new Link(cells[2], cells[3], 100, ctx!),
  new Link(cells[3], cells[4], 100, ctx!),
  new Link(cells[4], cells[5], 100, ctx!),
  new Link(cells[5], rect.getCells[0], 100, ctx!),
];
solver.addCircularEngine(4, 0, 50, cells[0]);
links.forEach((link) => solver.addLink(link));
cells.forEach((cell) => solver.addCell(cell));

// Main loop
function loop(timestamp: number) {
  dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  // Calculate and log FPS
  fps = 1 / dt;
  gui.update(`FPS: ${Math.floor(fps)}`);

  clearCanvas(ctx!, canvas);
  solver.update(dt);

  if (isMouseDown) {
    let x = mousePos.x;
    let y = mousePos.y;
    solver.addCircle(x, y, random(15, 30), getRandomColor());
  }
  
  requestAnimationFrame(loop);
}

loop(0);

canvas.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  mousePos = { x: e.offsetX, y: e.offsetY };
});

canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
});

canvas.addEventListener("mousemove", (e) => {
  mousePos = { x: e.offsetX, y: e.offsetY };
});
