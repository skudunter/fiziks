import { vector } from "./types";
import { addVec, subVec, multVec, ZERO } from "./utils";

// Cell class implemetning all the physics logic
class Cell {
  positionCurrent: vector;
  positionPrevious: vector;
  friction: number;
  acceleration: vector = { x: 0, y: 0 };
  constructor(
    public startX: number,
    public startY: number,
    public radius: number,
    public color: string,
    public mass: number,
    public ctx: CanvasRenderingContext2D
  ) {
    this.positionCurrent = { x: startX, y: startY };
    this.positionPrevious = { x: startX, y: startY };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.friction = 0.95;
  }
  display() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.positionCurrent.x,
      this.positionCurrent.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  updatePosition(dt: number) {
    let velocity: vector = subVec(this.positionCurrent, this.positionPrevious);
    velocity = multVec(velocity, this.friction);
    // save current position
    this.positionPrevious = this.positionCurrent;
    // perform verlet integration
    this.positionCurrent = 
      addVec(this.positionCurrent, addVec(velocity, multVec(this.acceleration,dt*dt*1000)))
   
    // reset acceleration
    this.acceleration = ZERO;
  }
  // apply force to the cell
  applyForce(force: vector) {
    this.acceleration = addVec(
      this.acceleration,
      multVec(force, 1 / this.mass)
    );
  }
}

export default Cell;
