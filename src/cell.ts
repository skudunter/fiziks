import { vector } from "./types";

// Cell class implemetning all the physics logic
class Cell {
  position: vector;
  velocity: vector = { x: 0, y: 0 };
  acceleration: vector = { x: 0, y: 0 };
  constructor(
    public startX: number,
    public startY: number,
    public radius: number,
    public color: string,
    public mass: number,
    public ctx: CanvasRenderingContext2D
  ) {
    this.position = { x: startX, y: startY };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
  }
}

export default Cell;