import { Vec2D } from "./vecs"
import { Fighter, Bullet, circleMan, BadGuy } from "./graphics"

export type moveName = 'notMoving' | 'arrowKey' | 'basicFire' | 'pushObj' | 'bulletKB' | 'dash' | 'orangeFire' | 'grab' | 'reversePushObj'

export type AutoMove = Move

export class Move {
  direction: Vec2D

  constructor(public name: moveName, public priority: number, public speed: number, public time: number) {
    this.direction = Vec2D.default()
  }

  queueMove(fighter: Fighter) {
    if (fighter.movement.time < 1 || fighter.movement.priority > (this.priority - 1)) {
      fighter.movement = this 
    }
  }

  circleMove(circleWithMove: Fighter | Bullet, dt: number) {
    if (circleWithMove.movement.time >= 0 ){
      //change distance moved to distance*frames passed or time left
      let adjustedDistance = circleWithMove.movement.speed*(Math.min(dt, circleWithMove.movement.time))
      let dcircleWithMovePosn = circleWithMove.movement.direction.clone().scale(adjustedDistance)
      if (dcircleWithMovePosn.x > 100){
        console.log('### something weird' + circleWithMove + dcircleWithMovePosn )
      }
      circleWithMove.posn = circleWithMove.posn.add(dcircleWithMovePosn)
      circleWithMove.movement.time -= dt
    }
  }

}