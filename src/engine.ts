import Cell from "./cell";
class Engine {
  protected speed: number;
  protected angle: number;
  protected radius: number;
  protected cell: Cell;
  protected startPosition: { x: number; y: number };
  constructor(speed: number, angle: number, cell: Cell, radius: number) {
    this.speed = speed;
    this.angle = angle;
    this.cell = cell;
    this.radius = radius;
    this.startPosition = cell.getPositionCurrent;
  }
  public update(dt: number) {
    throw new Error("Method not implemented.");
  }
}
class CircularEngine extends Engine {
  constructor(speed: number, angle: number,radius:number,cell:Cell) {
    super(speed, angle, cell, radius);
  }
  public update(dt: number) {
    this.angle += this.speed * dt;
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.startPosition.x + this.radius * Math.cos(this.angle),
      y: this.startPosition.y + this.radius * Math.sin(this.angle),
    };
  }
}
class HorizontalEngine extends Engine {
  constructor(speed: number, angle: number,radius:number, cell: Cell) {
    super(speed, angle, cell, radius);
  }
  public update(dt: number) {
    this.angle += this.speed * dt;
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.startPosition.x + this.radius * Math.cos(this.angle),
      y: this.cell.getPositionCurrent.y,
    };
  }
}
class VerticalEngine extends Engine {
  constructor(speed: number, angle: number,radius:number, cell: Cell) {
    super(speed, angle, cell, radius);
  }
  public update(dt: number) {
    this.angle += this.speed * dt;
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.cell.getPositionCurrent.x,
      y: this.startPosition.y + this.radius * Math.sin(this.angle),
    };
  }
}
export {
  CircularEngine,
  HorizontalEngine,
  VerticalEngine,
  Engine,
};
