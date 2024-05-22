import { vector } from "./types";

export enum ZERO {
  x = 0,
  y = 0,
}
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function background(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function resizeCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

export function addVec(a: vector, b: vector): vector {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subVec(a: vector, b: vector): vector {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function multVec(a: vector, b: number): vector {
  return { x: a.x * b, y: a.y * b };
}
export function dist(a: vector, b: vector): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
export function getRandomColor(): string {
  const greenValue = random(50,255);
  return `rgb(0, ${greenValue}, 0)`;
}
export function normalise(a:vector):vector{
  let mag = Math.sqrt(a.x**2 + a.y**2);
  return {x:a.x/mag,y:a.y/mag};
}
export class GUI{
  private div:HTMLDivElement;
  public constructor(){
    this.div = document.createElement("div");
    this.div.style.position = "absolute";
    this.div.style.top = "0";
    this.div.style.left = "0";
    this.div.style.color = "white";
    document.body.appendChild(this.div);
  }
  public update(text:string){
    this.div.innerText = text;
  }
}