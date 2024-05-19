![fiziks logo](https://github.com/skudunter/fiziks/blob/main/fiziks.png?raw=true)
# Fiziks
--- 
A simple physics simulation written in Typescript using Verlet Integration.
The code is very simple at places, keep in mind this is my first physics simulation.

**Everything is abstracted as much as possible under the Fiziks class**

*This project was built using vite*
# Contributing
---
Feel free to open a pull request or raise an issue.
# Features
---
- 2D Particle Physics and Collisions
- Constraints and Links
- Motors
- Rigidbody Physics
# Files
---
- `cell.ts`- contains the class for simulating a single cell
- `engine.ts`- contains the class for simulating a circular, horizontal or vertical engine
- `link.ts`- contains the class for simulating a single link between two cells
- `fiziks.ts`- contains the main physics solver and top level API
- `rigidBody.ts`- contains the class for connecting cells and links to form a rigidbody
- `util.ts`- contains utility functions to make my life easier
# Usage
---
## Installation

```bash
git clone https://github.com/skudunter/fiziks
cd fiziks
npm i
npm run dev
```

# API
## Class: `Fiziks`

The `Fiziks` class is a physics engine that manages cells, links, rigid bodies, and engines within a 2D canvas environment. It provides methods to add various elements and update their states according to physics simulations.

### Constructor

#### `constructor(width: number, height: number, ctx: CanvasRenderingContext2D)`

Creates a new instance of the `Fiziks` class.

- **Parameters:**
    - `width`: The width of the canvas.
    - `height`: The height of the canvas.
    - `ctx`: The 2D rendering context of the canvas.

### Public Methods

#### `addCell(cell: Cell): Cell`

Adds a cell to the physics engine.

- **Parameters:**
    - `cell`: An instance of the `Cell` class.
- **Returns:**
    - The added `Cell` instance.

#### `addLink(link: Link)`

Adds a link to the physics engine.

- **Parameters:**
    - `link`: An instance of the `Link` class.

#### `addCircularEngine(speed: number, angle: number, radius: number, cell: Cell): Engine`

Adds a circular engine to the physics engine.

- **Parameters:**
    - `speed`: The speed of the engine.
    - `angle`: The angle of the engine.
    - `radius`: The radius of the engine.
    - `cell`: An instance of the `Cell` class.
- **Returns:**
    - The added `Engine` instance.

#### `addHorizontalEngine(speed: number, angle: number, radius: number, cell: Cell): Engine`

Adds a horizontal engine to the physics engine.

- **Parameters:**
    - `speed`: The speed of the engine.
    - `angle`: The angle of the engine.
    - `radius`: The radius of the engine.
    - `cell`: An instance of the `Cell` class.
- **Returns:**
    - The added `Engine` instance.

#### `addVerticalEngine(speed: number, angle: number, radius: number, cell: Cell): Engine`

Adds a vertical engine to the physics engine.

- **Parameters:**
    - `speed`: The speed of the engine.
    - `angle`: The angle of the engine.
    - `radius`: The radius of the engine.
    - `cell`: An instance of the `Cell` class.
- **Returns:**
    - The added `Engine` instance.

#### `addRigidbody(cells: Cell[], color: string): RigidBody`

Adds a rigid body to the physics engine.

- **Parameters:**
    - `cells`: An array of `Cell` instances.
    - `color`: The color of the rigid body.
- **Returns:**
    - The added `RigidBody` instance.

#### `addSquare(x: number, y: number, size: number, color: string): RigidBody`

Adds a square-shaped rigid body to the physics engine.

- **Parameters:**
    - `x`: The x-coordinate of the top-left corner of the square.
    - `y`: The y-coordinate of the top-left corner of the square.
    - `size`: The size of the square.
    - `color`: The color of the square.
- **Returns:**
    - The added `RigidBody` instance.

#### `addCircle(x: number, y: number, radius: number, color: string): Cell`

Adds a circular cell to the physics engine.

- **Parameters:**
    - `x`: The x-coordinate of the circle's center.
    - `y`: The y-coordinate of the circle's center.
    - `radius`: The radius of the circle.
    - `color`: The color of the circle.
- **Returns:**
    - The added `Cell` instance.

#### `addRectangle(x: number, y: number, width: number, height: number, color: string): RigidBody`

Adds a rectangular rigid body to the physics engine.

- **Parameters:**
    - `x`: The x-coordinate of the top-left corner of the rectangle.
    - `y`: The y-coordinate of the top-left corner of the rectangle.
    - `width`: The width of the rectangle.
    - `height`: The height of the rectangle.
    - `color`: The color of the rectangle.
- **Returns:**
    - The added `RigidBody` instance.

#### `update(dt: number)`

Updates the physics engine for a given time step.

- **Parameters:**
    - `dt`: The time step for the update.
## Class: `Cell`

The `Cell` class represents a point mass with physics properties, such as position, velocity, and mass. It includes methods to update the cell's position based on forces applied and to render the cell on a canvas.

### Constructor

#### `constructor(startX: number, startY: number, radius: number, color: string, mass: number, friction: number, ctx: CanvasRenderingContext2D, unMoveable: boolean = false)`

Creates a new instance of the `Cell` class.

- **Parameters:**
    - `startX`: The initial x-coordinate of the cell.
    - `startY`: The initial y-coordinate of the cell.
    - `radius`: The radius of the cell.
    - `color`: The color of the cell.
    - `mass`: The mass of the cell.
    - `friction`: The friction coefficient affecting the cell's movement.
    - `ctx`: The 2D rendering context of the canvas.
    - `unMoveable` (optional): A boolean indicating if the cell is immovable. Defaults to `false`.

### Public Methods

#### `display()`

Renders the cell on the canvas.

#### `updatePosition(dt: number)`

Updates the cell's position based on its velocity and applied forces.

- **Parameters:**
    - `dt`: The time step for the update.

#### `applyForce(force: vector)`

Applies a force to the cell, affecting its acceleration.

- **Parameters:**
    - `force`: A vector representing the force to be applied.

### Getters

#### `getPositionCurrent`

Returns the current position of the cell.

- **Returns:**
    - The current position as a `vector`.

#### `getRadius`

Returns the radius of the cell.

- **Returns:**
    - The radius as a `number`.

#### `static`

Returns whether the cell is immovable.

- **Returns:**
    - A boolean indicating if the cell is immovable.

### Setters

#### `setPositionCurrent`

Sets the current position of the cell. The position will not be updated if the cell is immovable.

- **Parameters:**
    - `position`: A `vector` representing the new position.

#### `setPositionCurrentRegardLessOfFixed`

Sets the current position of the cell regardless of whether it is immovable.

- **Parameters:**
    - `position`: A `vector` representing the new position.
## Class: `Link`

The `Link` class represents a constraint between two `Cell` instances, maintaining a specified distance (target length) between them. It includes methods to apply the constraint and render the link on a canvas.

### Constructor

#### `constructor(node1: Cell, node2: Cell, targetLength: number, ctx: CanvasRenderingContext2D)`

Creates a new instance of the `Link` class.

- **Parameters:**
    - `node1`: The first `Cell` instance connected by the link.
    - `node2`: The second `Cell` instance connected by the link.
    - `targetLength`: The target length that the link tries to maintain between the two cells.
    - `ctx`: The 2D rendering context of the canvas.
# Sources
---
![](https://www.youtube.com/watch?v=lS_qeBy3aQI)

![](https://www.youtube.com/watch?v=3HjO_RGIjCU)

- [verlet-integration-article](https://betterprogramming.pub/making-a-verlet-physics-engine-in-javascript-1dff066d7bc5)

# Bugs

- Polygons only have collisions on their points
- There is for loop redundancy in the solver class
