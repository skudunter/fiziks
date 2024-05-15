import { vector } from "./types";

// Cell class implemetning all the physics logic
class Cell {
  positionCurrent: vector;
  positionPrevious: vector;
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
    this.positionCurrent = { x: startX, y: startY };
    this.positionPrevious = { x: startX, y: startY };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
  }
  display(){
    this.ctx.beginPath();
    this.ctx.arc(this.positionCurrent.x, this.positionCurrent.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

export default Cell;