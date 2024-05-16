import Cell from "./cell";
import { vector } from "./types";
import { ZERO, addVec, dist, multVec, subVec } from "./utils";

class CircularSolver {
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;

  // Parameters
  gravity: vector = { x: 0, y: 1 };
  constraintMiddlePoint: vector = { x: 0, y: 0 };
  constraintRadius: number = 400;

  constructor(
    public cells: Cell[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.cells = cells;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = ctx;
    this.constraintMiddlePoint = { x: this.width / 2, y: this.height / 2 };
  }
  public update(dt: number) {
    this.applyGravity();
    this.updatePositions(dt);
    this.applyCollision();
    this.applyConstraints();
    this.visualizeConstraints();
  }
  private updatePositions(dt: number) {
    this.cells.forEach((cell) => {
      cell.updatePosition(dt);
      cell.display();
    });
  }
  private applyGravity() {
    this.cells.forEach((cell) => {
      cell.applyForce(this.gravity);
    });
  }
  private applyConstraints() {
    this.cells.forEach((cell) => {
      const toObject = subVec(this.constraintMiddlePoint, cell.positionCurrent);
      const distanceToConstraint = dist(
        cell.positionCurrent,
        this.constraintMiddlePoint
      );
      if (distanceToConstraint > (this.constraintRadius- cell.radius)) {
        const n = multVec(toObject, 1 / distanceToConstraint);
        cell.positionCurrent = subVec(this.constraintMiddlePoint, multVec(n, this.constraintRadius - cell.radius));
      }
    });
  }
  private visualizeConstraints() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.constraintMiddlePoint.x,
      this.constraintMiddlePoint.y,
      this.constraintRadius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }
  private applyCollision() {
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      for (let j = i + 1; j < this.cells.length; j++) {
        let other = this.cells[j];
        let collisonAxis = subVec(cell.positionCurrent, other.positionCurrent);
        const distance = dist(collisonAxis, ZERO);
        if (distance < cell.radius + other.radius) {
          const n: vector = multVec(collisonAxis, 1 / distance);
          let delta = cell.radius + other.radius - distance;
          cell.positionCurrent = addVec(cell.positionCurrent, multVec(n, delta / 2));
          other.positionCurrent = subVec(other.positionCurrent, multVec(n, delta / 2));
        }
      }
    }
  }
}

export default CircularSolver;
