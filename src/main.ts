import "./style.css";
import Solver from "./solver";
import Cell from "./cell";
import {
  resizeCanvas,
  clearCanvas,
  subVec,
  multVec,
  normalise,
  getRandomColor,
} from "./utils";
import Link from "./link";

// Get the canvas element and its context
let canvas = resizeCanvas(
  document.getElementById("canvas") as HTMLCanvasElement
);
let ctx = canvas.getContext("2d");

// Constants
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Setup main components
let solver = new Solver(WIDTH, HEIGHT, ctx!);
let lastTime = 0;
let dt = 0;
let cells = [
  new Cell(WIDTH / 2, 100, 20, getRandomColor(), 1, 0.99, ctx!, true),
  new Cell(WIDTH / 2 + 30, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 50, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 10, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 40, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 60, 200, 20, getRandomColor(), 1, 1, ctx!),
  new Cell(WIDTH / 2 + 90, 200, 20, getRandomColor(), 1, 1, ctx!),
];
let links = [
  new Link(cells[0], cells[1], 100, ctx!),
  new Link(cells[1], cells[2], 100, ctx!),
  new Link(cells[2], cells[3], 100, ctx!),
  new Link(cells[3], cells[4], 100, ctx!),
  new Link(cells[4], cells[5], 100, ctx!),
  new Link(cells[5], cells[6], 100, ctx!),
];
links.forEach((link) => solver.addLink(link));
cells.forEach((cell) => solver.addCell(cell));

// Main loop
function loop(timestamp: number) {
  dt = (timestamp - lastTime) / 1000;

  lastTime = timestamp;
  clearCanvas(ctx!, canvas);

  solver.update(dt);
  requestAnimationFrame(loop);
}
// on mouse click, do shit
canvas.addEventListener("click", (e) => {
  let mousePos = {x:e.x,y:e.y};
  let delta = subVec(mousePos,cells[6].getPositionCurrent);
  let force = multVec(normalise(delta),100);
  cells[6].applyForce(force);
});

loop(0);
