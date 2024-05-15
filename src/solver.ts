import Cell from "./cell";
import { vector } from "./types";

class Solver {
  gravity: vector = { x: 0, y: 1000 };
  constructor(public cells: Cell[], public ctx: CanvasRenderingContext2D) {
    this.cells = cells;
    this.ctx = ctx;
  }
  public update(dt: number) {
    this.applyGravity();
    this.updatePositions(dt);
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
}

export default Solver;
