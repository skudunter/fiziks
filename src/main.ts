import "./style.css";
import Solver from "./solver";
import { resizeCanvas, clearCanvas, subVec,multVec,normalise } from "./utils";

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
// on mouse click, do shit
canvas.addEventListener("click", (e) => {
  let mousePos = {x:e.x,y:e.y};
  let delta = subVec(mousePos,rect.getCenter);
  let force = multVec(normalise(delta),100)
  rect.applyForce(force);
});

loop(0);
