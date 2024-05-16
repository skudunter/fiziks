import Cell from "./cell";
import { vector } from "./types";
import { addVec, dist, multVec, subVec } from "./utils";

class CircularSolver {
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;

  // Parameters
  gravity: vector = { x: 0, y: 1 };
  constraintMiddlePoint: vector = { x: 0, y: 0 };
  constraintRadius: number = 300;

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
      const toObject = subVec(cell.positionCurrent, this.constraintMiddlePoint);
      const distanceToConstraint = dist(
        cell.positionCurrent,
        this.constraintMiddlePoint
      );
      if (distanceToConstraint > this.constraintRadius - cell.radius) {
        const n = multVec(toObject, 1 / distanceToConstraint);
        cell.positionCurrent = addVec(
          this.constraintMiddlePoint,
          multVec(n, distanceToConstraint - cell.radius)
        );
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
}

export default CircularSolver;
