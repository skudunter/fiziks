import Cell from "./cell";
class Engine {
  protected speed: number;
  protected angle: number;
  protected cell: Cell;
  protected radius: number;
  constructor(speed: number, angle: number, radius: number, cell: Cell) {
    this.speed = speed;
    this.angle = angle;
    this.cell = cell;
    this.radius = radius;
  }
  public update(dt: number) {
    throw new Error("Method not implemented.");
  }
}
class CircularEngine extends Engine {
  constructor(speed: number, angle: number, cell: Cell, radius: number) {
    super(speed, angle, radius, cell);
  }
  public update(dt: number) {
    this.angle += this.speed * dt;
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.cell.getPositionCurrent.x + this.radius * Math.cos(this.angle),
      y: this.cell.getPositionCurrent.y + this.radius * Math.sin(this.angle),
    };
  }
}
class LinearEngine extends Engine {
  constructor(speed: number, angle: number, cell: Cell) {
    super(speed, angle, 0, cell);
  }
  public update(dt: number) {
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.cell.getPositionCurrent.x + this.speed * Math.cos(this.angle),
      y: this.cell.getPositionCurrent.y + this.speed * Math.sin(this.angle),
    };
  }
}
class VerticalEngine extends LinearEngine {
  constructor(speed: number, angle: number, cell: Cell) {
    super(speed, angle, cell);
  }
  public update(dt: number) {
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.cell.getPositionCurrent.x,
      y: this.cell.getPositionCurrent.y + this.speed,
    };
  }
}
class HorizontalEngine extends LinearEngine {
  constructor(speed: number, angle: number, cell: Cell) {
    super(speed, angle, cell);
  }
  public update(dt: number) {
    this.cell.setPositionCurrentRegardLessOfFixed = {
      x: this.cell.getPositionCurrent.x + this.speed,
      y: this.cell.getPositionCurrent.y,
    };
  }
}
export {
  CircularEngine,
  LinearEngine,
  HorizontalEngine,
  VerticalEngine,
  Engine,
};
