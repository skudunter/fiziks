import Cell from "./cell";
import Link from "./link";
import { dist } from "./utils";

class RigidBody {
  private cells: Cell[];
  private links: Link[];
  private ctx: CanvasRenderingContext2D;
  private color: string;

  public constructor(
    cells: Cell[],
    ctx: CanvasRenderingContext2D,
    color: string
  ) {
    this.cells = cells;
    this.links = [];
    this.color = color;
    this.ctx = ctx;
    this.linkCells();
  }
  get getCells() {
    return this.cells;
  }
  get getLinks() {
    return this.links;
  }
  private linkCells() {
    if (this.cells.length < 2) return;
    for (let i = 0; i < this.cells.length; i++) {
      let j = (i + 1) % this.cells.length;
      this.links.push(
        new Link(
          this.cells[i],
          this.cells[j],
          dist(
            this.cells[i].getPositionCurrent,
            this.cells[j].getPositionCurrent
          ),
          this.ctx
        )
      );
    }
  }
  public applyForce(force: { x: number; y: number }) {
    for (let cell of this.cells) {
      cell.applyForce(force);
    }
  }
  public addTorque(torque: number) {
    const center = this.getCenter;
    for (let cell of this.cells) {
      const force = {
        x: center.x - cell.getPositionCurrent.x,
        y: center.y - cell.getPositionCurrent.y,
      };
      cell.applyForce({
        x: force.y * torque,
        y: -force.x * torque,
      });
    }
  }
  get getCenter() {
    let x = 0;
    let y = 0;
    for (let cell of this.cells) {
      x += cell.getPositionCurrent.x;
      y += cell.getPositionCurrent.y;
    }
    return { x: x / this.cells.length, y: y / this.cells.length };
  }
  public display() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.moveTo(
      this.cells[0].getPositionCurrent.x,
      this.cells[0].getPositionCurrent.y
    );
    for (let cell of this.cells) {
      this.ctx.lineTo(cell.getPositionCurrent.x, cell.getPositionCurrent.y);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  get cellsList() {
    return this.cells;
  }
}

export default RigidBody;
