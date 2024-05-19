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

## API

# Sources
---
![](https://www.youtube.com/watch?v=lS_qeBy3aQI)

![](https://www.youtube.com/watch?v=3HjO_RGIjCU)

- [verlet-integration-article](https://betterprogramming.pub/making-a-verlet-physics-engine-in-javascript-1dff066d7bc5)