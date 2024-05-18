import { vector } from "./types";
import { addVec, subVec, multVec, ZERO } from "./utils";

// Cell class implemetning all the physics for a point mass
class Cell {
  private positionCurrent: vector;
  private positionPrevious: vector;
  private friction: number;
  private acceleration: vector = { x: 0, y: 0 };
  private radius: number;
  private color: string;
  private mass: number;
  private ctx: CanvasRenderingContext2D;
  private unMoveable: boolean;
  public constructor(
    startX: number,
    startY: number,
    radius: number,
    color: string,
    mass: number,
    friction: number,
    ctx: CanvasRenderingContext2D,
    unMoveable: boolean = false
  ) {
    this.positionCurrent = { x: startX, y: startY };
    this.positionPrevious = { x: startX, y: startY };
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.friction = friction;
    this.ctx = ctx;
    this.unMoveable = unMoveable;
  }
  public display() {
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
  public updatePosition(dt: number) {
    // the actual meat of the entire simulation
    let velocity: vector = subVec(this.positionCurrent, this.positionPrevious);
    // apply friction
    velocity = multVec(velocity, this.friction);
    // save current position
    this.positionPrevious = this.positionCurrent;
    // perform verlet integration
    if (!this.unMoveable) {
      this.positionCurrent = addVec(
        this.positionCurrent,
        addVec(velocity, multVec(this.acceleration, dt * dt * 1000))
      );
    }
    // reset acceleration
    this.acceleration = ZERO;
  }
  // apply force to the cell
  public applyForce(force: vector) {
    this.acceleration = addVec(
      this.acceleration,
      multVec(force, 1 / this.mass)
    );
  }
  // setters and getters
  public get getPositionCurrent() {
    return this.positionCurrent;
  }
  public get getRadius() {
    return this.radius;
  }
  public get static() {
    return this.unMoveable;
  }
  public set setPositionCurrent(position: vector) {
    if (this.unMoveable) return;
    this.positionCurrent = position;
  }
  public set setPositionCurrentRegardLessOfFixed(position: vector) {
    this.positionCurrent = position;
  }
}

export default Cell;
