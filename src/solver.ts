import Cell from "./cell";
import { vector } from "./types";
import { ZERO, addVec, dist, multVec, subVec } from "./utils";
import Link from "./link";
class Solver {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private gravity: vector;
  private subSteps: number;
  private cells: Cell[];
  private links: Link[];

  public constructor(
    cells: Cell[],
    links: Link[],
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.cells = cells;
    this.links = links;
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    // Variables
    this.gravity = { x: 0, y: 1 };
    this.subSteps = 2;
  }
  public update(dt: number) {
    const subDt = dt / this.subSteps;
    for (let i = this.subSteps; i > 0; i--) {
      this.applyGravity();
      this.updatePositions(subDt);
      this.applyCollision();
      this.applyConstraints();
      this.applyLinks();
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
  private applyLinks(){
    this.links.forEach((link)=>{
      link.apply();
      link.display();
    });
  }
  private applyConstraints() {
    this.cells.forEach((cell) => {
      if (cell.getPositionCurrent.x > this.width - cell.getRadius) {
        cell.setPositionCurrent = {
          x: this.width - cell.getRadius,
          y: cell.getPositionCurrent.y,
        };
      }
      if (cell.getPositionCurrent.x < cell.getRadius) {
        cell.setPositionCurrent = {
          x: cell.getRadius,
          y: cell.getPositionCurrent.y,
        };
      }
      if (cell.getPositionCurrent.y > this.height - cell.getRadius) {
        cell.setPositionCurrent = {
          x: cell.getPositionCurrent.x,
          y: this.height - cell.getRadius,
        };
      }
      if (cell.getPositionCurrent.y < cell.getRadius) {
        cell.setPositionCurrent = {
          x: cell.getPositionCurrent.x,
          y: cell.getRadius,
        };
      }
    });
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
