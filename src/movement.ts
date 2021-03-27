import {Vec2D} from "./vecs"



// export interface AutoMove {
//     autoMove: Move
//   }

// export type MoveName = keyof typeof _moves
  
// let _moves: {[key: string]: Move} = {
//     NotMoving: {
//       name: "not moving",
//       priority: 10,
//       speed: 0,
//       direction: Vec2D.default(),
//       time: 0
//     },
//     ArrowKeyMove: {
//       name: "arrow key move",
//       priority: 10,
//       speed: 1,
//       direction: Vec2D.default(),
//       time: 1000
//     },
//     BasicFire: {
//       name: "bullet move",
//       priority: 10,
//       direction: Vec2D.default(),
//       speed: 0.5,
//       time: 10000
//    },
//    PushObj: {
//       name: "collision",
//       priority: 5,
//       speed: 1,
//       direction: Vec2D.default(),
//       time:5
//    },
//    BulletKB: {
//     name: "bulletKB", 
//     priority: 2,
//     speed: 2,  
//     direction: Vec2D.default(), 
//     time: 1
//     },
//     Dash: {
//       name: "dash", 
//       priority: 8,
//       speed: 1, 
//       direction: Vec2D.default(), 
//       time: 250
//     },
//     OrangeFire: {
//       name: "orangeBulletMove",
//       priority: 5,
//       speed: 0.5,
//       direction: Vec2D.default(),
//       time: 5000
//     },
//     Grab: {
//       name: "grabMove",
//       priority: 2,
//       speed: 1.75,
//       direction: Vec2D.default(),
//       time: 5000
//     }
//   }

// export const moves: { [name in MoveName]: Move } = _moves

// export interface Move {
//     name: String
//     priority: number
//     speed: number
//     direction: Vec2D
//     time: number
//   }

export type moveName = 'notMoving' | 'arrowKey' | 'basicFire' | 'pushObj' | 'bulletKB' | 'dash' | 'orangeFire' | 'grab'

export abstract class Move {
  direction: Vec2D

  constructor(public name: moveName, public priority: number, public speed: number, public time: number) {
    this.direction = Vec2D.default()
  }
}