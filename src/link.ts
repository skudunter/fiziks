import Cell from "./cell";
import { addVec, dist, multVec, subVec } from "./utils";

class Link {
  private node1: Cell;
  private node2: Cell;
  private targetLength: number;
  private ctx: CanvasRenderingContext2D;
  public constructor(
    node1: Cell,
    node2: Cell,
    targetLength: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.node1 = node1;
    this.node2 = node2;
    this.ctx = ctx;
    this.targetLength = targetLength;
  }
  public apply() {
const axis = subVec(
  this.node1.getPositionCurrent,
  this.node2.getPositionCurrent
);
const distance = dist(
  this.node1.getPositionCurrent,
  this.node2.getPositionCurrent
);
const n = multVec(axis, 1 / distance);
const delta = this.targetLength - distance;
const totalMass = this.node1.getMass + this.node2.getMass;
this.node1.setPositionCurrent = addVec(
  this.node1.getPositionCurrent,
  multVec(n, delta * (this.node2.getMass / totalMass))
);
this.node2.setPositionCurrent = addVec(
  this.node2.getPositionCurrent,
  multVec(n, -delta * (this.node1.getMass / totalMass))
);
  }
  public display() {
    this.ctx.beginPath();
    this.ctx.moveTo(
      this.node1.getPositionCurrent.x,
      this.node1.getPositionCurrent.y
    );
    this.ctx.lineTo(
      this.node2.getPositionCurrent.x,
      this.node2.getPositionCurrent.y
    );
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }
}

export default Link;
