import Cell from "./cell";
import { vector } from "./types";
import { ZERO, addVec, dist, multVec, subVec } from "./utils";
import Link from "./link";
import RigidBody from "./rigidBody";

class Solver {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private gravity: vector;
  private subSteps: number;
  private cells: Cell[];
  private links: Link[];
  private friction: number;
  private displayWireFrame: boolean;
  private rigidBodies: RigidBody[];
  private hiddenPointColor: string;

  public constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.cells = [];
    this.links = [];
    this.rigidBodies = [];
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    // Variables
    this.gravity = { x: 0, y: 0.5 };
    this.hiddenPointColor = "#000000";
    this.subSteps = 2;
    this.friction = 0.99;
    this.displayWireFrame = false;
  }
  public addCell(cell: Cell): Cell {
    this.cells.push(cell);
    return cell;
  }
  public addLink(link: Link) {
    this.links.push(link);
  }
  public addRigidbody(cells: Cell[], color: string): RigidBody {
    let rigidBody = new RigidBody(cells, this.ctx, color);
    this.rigidBodies.push(rigidBody);
    this.cells = this.cells.concat(rigidBody.getCells);
    this.links = this.links.concat(rigidBody.getLinks);
    return rigidBody;
  }
  public addSquare(
    x: number,
    y: number,
    size: number,
    color: string
  ): RigidBody {
    let cells = [
      new Cell(x, y, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x + size, y, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x + size, y + size, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x, y + size, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
    ];
    this.addLink(
      new Link(
        cells[0],
        cells[2],
        dist(cells[0].getPositionCurrent, cells[2].getPositionCurrent),
        this.ctx
      )
    );
    return this.addRigidbody(cells, color);
  }
  public addCircle(x: number, y: number, radius: number, color: string): Cell {
    return this.addCell(
      new Cell(x, y, radius, color, 1, this.friction, this.ctx)
    );
  }
  public addRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): RigidBody {
    let cells = [
      new Cell(x, y, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x + width, y, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x + width, y + height, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
      new Cell(x, y + height, 0.1, this.hiddenPointColor, 1, this.friction, this.ctx),
    ];
    this.addLink(
      new Link(
        cells[0],
        cells[2],
        dist(cells[0].getPositionCurrent, cells[2].getPositionCurrent),
        this.ctx
      )
    );
    this.addLink(
      new Link(
        cells[1],
        cells[3],
        dist(cells[1].getPositionCurrent, cells[3].getPositionCurrent),
        this.ctx
      )
    );
    return this.addRigidbody(cells, color);
  }
  private displayRigidBodies() {
    this.rigidBodies.forEach((rigidBody) => {
      rigidBody.display();
    });
  }
  public update(dt: number) {
    const subDt = dt / this.subSteps;
    for (let i = this.subSteps; i > 0; i--) {
      this.applyGravity();
      this.updatePositions(subDt);
      this.applyCollision();
      this.applyConstraints();
      this.displayRigidBodies();
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
  private applyLinks() {
    this.links.forEach((link) => {
      link.apply();
      if (this.displayWireFrame) {
        link.display();
      }
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
