import { circleMan, badGuyManager, bulletManager, Fighter } from "./circles"
import { actions, mousePosition, Actions } from "./inputs"
import { Vec2D, } from "./vecs"
import { Move, moves } from "./movement"
import { isOob, isCollision, mousedOverBadGuy } from "./detection"
import { cloneObject } from "./util"

const queueMove = (fighter: Fighter, attemptedMove: Move) => {
  if (fighter.movement.time < 1 || fighter.movement.priority > (attemptedMove.priority - 1)) {
    fighter.movement = attemptedMove 
  }
}

const circleMove = (circleWithMove: Fighter, dt: number) => {
  if (circleWithMove.movement.time >= 0 ){
    let adjustedSpeed = circleWithMove.movement.speed*(Math.min(dt, circleWithMove.movement.time))
    let dcircleWithMovePosn = circleWithMove.movement.direction.scale(adjustedSpeed)
    circleWithMove.posn = circleWithMove.posn.add(dcircleWithMovePosn)
    circleWithMove.movement.time -= dt
  }
}

const arrowKeysQueueMove = () => {
  let dPosn: Vec2D = Vec2D.default()
  if (actions.up) dPosn.y -= 1
  if (actions.down) dPosn.y += 1
  if (actions.left) dPosn.x -= 1 
  if (actions.right) dPosn.x += 1
  dPosn = dPosn.normalize()
  let arrowKeyMove = cloneObject(moves.ArrowKeyMove)
  arrowKeyMove.direction = dPosn
  arrowKeyMove.speed = circleMan.spd
  queueMove(circleMan, arrowKeyMove)
}

const skillEffects = () => {
  orangePull()
  for (let skill of circleMan.skills) {
    if (skill.isActivating()) {
      skill.cast()
      }
    }
  }
}

const badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
  badGuys.forEach((otherBadGuy, otherBadGuyIdx) => {
    if (badGuyIdx == otherBadGuyIdx) {
      return
    } else if (isCollision(badGuy, otherBadGuy)) {
      let pushObj = cloneObject(moves.PushObj)
      pushObj.direction = normalize(subtractVec2D(badGuy.posn, otherBadGuy.posn))
      queueMove(badGuy, pushObj)
      let reversePushObj = {...pushObj}
      reversePushObj.direction = reverseVec2D(reversePushObj.direction)
      queueMove(otherBadGuy, reversePushObj)
    }
  })
  if (isCollision(badGuy, circleMan)) {
    let pushObj = cloneObject(moves.PushObj)
    pushObj.direction = normalize(subtractVec2D(badGuy.posn, circleMan.posn))
    badGuy.movement = pushObj
  } 
}

const cleanup = () => {
  let badGuysToRemove: number[] = []
  badGuys.forEach( (badGuy, badGuyIdx) => {
    console.log('Cleanup is running with ' + badGuys.length + ' Badguys')
    bullets.forEach((bullet, bulletIdx) => {
      if (isCollision(badGuy, bullet)) {
        let bulletKB = cloneObject(moves.BulletKB)
        bulletKB.direction = normalize(subtractVec2D(badGuy.posn, bullet.posn))
        queueMove(badGuy, bulletKB)
        if (bullet.name == "basic fire") {
          bullets.splice(bulletIdx, 1)
          badGuy.hp -= 1
        }
        if (badGuy.hp < 1) {
          badGuysToRemove.push(badGuyIdx)
        }
      }
    })
    if (isOob(badGuy)) {
      badGuysToRemove.push(badGuyIdx)
    }
  })
  badGuysToRemove.forEach((badGuyIdx) => {
    badGuys.splice(badGuyIdx, 1)
  })
  bullets.forEach((bullet, bulletIdx) => {
    if (isOob(bullet)) {
      bullets.splice(bulletIdx, 1)
    }
  })
}

const orangePull = () => {
  bullets.forEach((bullet) => {
    if (bullet.name == "orange fire") {
      badGuys.forEach(badguy => {
        let pushToOrange = cloneObject(moves.PushObj)
        pushToOrange.direction = normalize(subtractVec2D(bullet.posn, badguy.posn))
        queueMove(badguy, pushToOrange)
      })
    }
  })
}

const bulletsMoveToPosn = (dt: number) => {
  bullets.forEach((bullet, idx) => {
    circleMove(bullet, dt)
  })
}

const skillsUpdate = (dt: number) => {
  skillEffects()
  arrowKeysQueueMove()
}

const badGuysQueueMove = (dt: number) => {
  badGuys.forEach((badGuy, badGuyIdx) => {
    badGuysCollisionDetection(badGuy, badGuyIdx)
  })
}

const badGuysMoveToPosn = (dt: number) => {
  badGuys.forEach(badGuy => {
    circleMove(badGuy, dt)
  })
}

const circlesMove = (dt: number) => {
  circleMove(circleMan, dt)
  bulletsMoveToPosn(dt)
  badGuysMoveToPosn(dt)
}

export const update = (dt: number) => {
  badGuysQueueMove(dt)
  skillsUpdate(dt)
  cleanup()
  circlesMove(dt)
}