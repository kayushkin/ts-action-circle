import {Vec2D} from "./vecs"

export interface Move {
    name: String
    priority: number
    speed: number
    direction: Vec2D
    time: number
  }

export interface AutoMove {
    autoMove: Move
  }
  
export let moves: {[key: string]: Move} = {
    "notMoving": {
      name: "not moving",
      priority: 10,
      speed: 0,
      direction: {x:0, y:0},
      time: 0
    },
    "arrowKeyMove": {
      name: "arrow key move",
      priority: 10,
      speed: 1,
      direction: {x:0, y:0},
      time: 1000
    },
    "basic fire": {
      name: "bullet move",
      priority: 10,
      direction: {x:0, y:0},
      speed: 1.1,
      time: 100
   },
   "pushObj": {
      name: "collision",
      priority: 5,
      speed: 1,
      direction: {x:0, y:0},
      time:5
   },
   "bulletKB": {
    name: "bulletKB", 
    priority: 2,
    speed: 2,  
    direction: {x:0, y:0}, 
    time: 1
    },
    "dash": {
      name: "dash", 
      priority: 8,
      speed: 5, 
      direction: {x:0, y:0}, 
      time: 250
    },
    "orange fire": {
      name: "orangeBulletMove",
      priority: 5,
      speed: 0.5,
      direction: {x:0, y:0},
      time: 5000
    },
    "grab": {
      name: "grabMove",
      priority: 2,
      speed: 5,
      direction: {x:0, y:0},
      time: 5000
    }
  }