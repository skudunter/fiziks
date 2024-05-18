import Cell from "./cell";
import { dist, subVec } from "./utils";

class Link {
  private node1: Cell;
  private node2: Cell;
  private targetLength: number;
  public constructor(node1: Cell, node2: Cell, targetLength: number) {
    this.node1 = node1;
    this.node2 = node2;
    this.targetLength = targetLength;
  }
  public apply() {
    const axis = subVec(
      this.node1.getPositionCurrent,
      this.node2.getPositionCurrent
    );
    const distance = dist(this.node1.getPositionCurrent, this.node2.getPositionCurrent);
    const springForce = (distance - this.targetLength) * 0.1;
    const force = { x: axis.x * springForce, y: axis.y * springForce };
    this.node1.applyForce(force);
    this.node2.applyForce({ x: -force.x, y: -force.y });
  }
}

export default Link;
