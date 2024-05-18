import Cell from "./cell";
import { vector } from "./types";
import { ZERO, addVec, dist, multVec, subVec } from "./utils";

class Solver {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private gravity: vector;
  private constraintMiddlePoint: vector;
  private constraintRadius: number;
  private subSteps: number;
  private cells: Cell[];

  public constructor(
    cells: Cell[],
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.cells = cells;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    // Variables
    this.gravity = { x: 0, y: 0.1 };
    this.constraintRadius = 450;
    this.subSteps = 1;
    this.constraintMiddlePoint = { x: this.width / 2, y: this.height / 2 };
  }
  public update(dt: number) {
    const subDt = dt / this.subSteps;
    for (let i = this.subSteps; i > 0; i--) {
      this.applyGravity();
      this.updatePositions(subDt);
      this.applyCollision();
      this.applyConstraints();
      this.visualizeConstraints();
    }
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
      const toObject = subVec(
        this.constraintMiddlePoint,
        cell.getPositionCurrent
      );
      const distanceToConstraint = dist(
        cell.getPositionCurrent,
        this.constraintMiddlePoint
      );
      if (distanceToConstraint > this.constraintRadius - cell.getRadius) {
        const n = multVec(toObject, 1 / distanceToConstraint);
        cell.setPositionCurrent = subVec(
          this.constraintMiddlePoint,
          multVec(n, this.constraintRadius - cell.getRadius)
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
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }
  private applyCollision() {
    for (let i = 0; i < this.cells.length; i++) {
      let cell = this.cells[i];
      for (let j = i + 1; j < this.cells.length; j++) {
        let other = this.cells[j];
        let collisonAxis = subVec(
          cell.getPositionCurrent,
          other.getPositionCurrent
        );
        const distance = dist(collisonAxis, ZERO);
        if (distance < cell.getRadius + other.getRadius) {
          const n: vector = multVec(collisonAxis, 1 / distance);
          let delta = cell.getRadius + other.getRadius - distance;
          cell.setPositionCurrent = addVec(
            cell.getPositionCurrent,
            multVec(n, delta / 2)
          );
          other.setPositionCurrent = subVec(
            other.getPositionCurrent,
            multVec(n, delta / 2)
          );
        }
      }
    }
  }
}

export default Solver;
