import Cell from "./cell";
import { vector } from "./types";
import { addVec, dist, multVec, subVec } from "./utils";

class Solver {
  public width: number;
  public height: number;
  gravity: vector = { x: 0, y: 1 };
  constructor(public cells: Cell[], canvas: HTMLCanvasElement) {
    this.cells = cells;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  public update(dt: number) {
    this.applyGravity();
    this.updatePositions(dt);
    this.applyConstraints();
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
    const constraintMiddlePoint = { x: this.width / 2, y: this.height / 2 };
    const constraintRadius = 400;
    this.cells.forEach((cell) => {
      const toObject = subVec(cell.positionCurrent, constraintMiddlePoint);
      const distanceToConstraint = dist(
        cell.positionCurrent,
        constraintMiddlePoint
      );
      if (distanceToConstraint > constraintRadius - cell.radius) {
        const n = multVec(toObject, 1 / distanceToConstraint);
        cell.positionCurrent = addVec(
          constraintMiddlePoint,
          multVec(n, distanceToConstraint - cell.radius)
        );
      }
    });
  }
}

export default Solver;
