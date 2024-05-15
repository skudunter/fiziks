import './style.css';
import Cell from './cell';

// Get the canvas element and its context
let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let ctx = canvas.getContext('2d');

// Setup main parts  
let cell = new Cell(100, 100, 20, 'red', 1, ctx!);
