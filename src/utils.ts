import { vector } from "./types";
export enum ZERO {
    x = 0,
    y = 0,
}
export function clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function background(ctx: CanvasRenderingContext2D, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function resizeCanvas(canvas: HTMLCanvasElement) : HTMLCanvasElement {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
    return canvas;
}

export function addVec(a: vector, b: vector):vector {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function subVec(a: vector, b: vector):vector {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function multVec(a: vector, b: number):vector {
  return { x: a.x * b, y: a.y * b };
}