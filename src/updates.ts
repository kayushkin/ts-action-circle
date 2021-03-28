import { circleMan, badGuyManager, bulletManager, Fighter, BadGuy, Bullet } from "./circles"
import { actions, mousePosition, Actions } from "./inputs"
import { Vec2D, } from "./vecs"
import { Move } from "./movement"
import { isOob, isCollision, mousedOverBadGuy } from "./detection"
import { cloneObject } from "./util"

const badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
  badGuyManager.badGuys.forEach((otherBadGuy, otherBadGuyIdx) => {
    if (badGuyIdx == otherBadGuyIdx) {
      return
    } else if (isCollision(badGuy, otherBadGuy)) {
      let pushObj: Move = new Move('pushObj', 5, 1, 5)
      pushObj.direction = badGuy.posn.clone().sub(otherBadGuy.posn.clone()).normalize()
      pushObj.queueMove(badGuy)
      let reversePushObj = pushObj
      reversePushObj.direction = reversePushObj.direction.neg()
      reversePushObj.queueMove(otherBadGuy)
    }
  })
  if (isCollision(badGuy, circleMan)) {
    let pushObj = new Move('pushObj', 5, 1, 5)
    pushObj.direction = badGuy.posn.clone().sub(circleMan.posn.clone()).normalize()
    pushObj.queueMove(badGuy)
  } 
}

const badGuysCollisionForAll = (dt: number) => {
  badGuyManager.badGuys.forEach((badGuy, badGuyIdx) => {
    badGuysCollisionDetection(badGuy, badGuyIdx)
  })
}

const orangePull = () => {
  bulletManager.bullets.forEach((bullet) => {
    if (bullet.name == "orange fire") {
      badGuyManager.badGuys.forEach(badguy => {
        let pushToOrange: Move = new Move('pushObj', 5, 1, 5)
        pushToOrange.direction = bullet.posn.clone().sub(badguy.posn.clone()).normalize()
        pushToOrange.queueMove(badguy)
      })
    }
  })
}

const skillEffects = () => {
  //orangePull()
  for (let skill of circleMan.skills) {
    if (skill.isActivating()) { 
      skill.cast() }
  }
}

const arrowKeysQueueMove = () => {
  let dPosn: Vec2D = Vec2D.default()
  if (actions.up) dPosn.y -= 1
  if (actions.down) dPosn.y += 1
  if (actions.left) dPosn.x -= 1 
  if (actions.right) dPosn.x += 1
  dPosn = dPosn.normalize()
  let arrowKeyMove: Move = new Move('arrowKey', 10, 1, 1000)
  arrowKeyMove.direction = dPosn
  arrowKeyMove.speed = circleMan.spd
  arrowKeyMove.queueMove(circleMan)
}

const skillsUpdate = (dt: number) => {
  skillEffects()
  arrowKeysQueueMove()
}

const cleanup = () => {
  let badGuysToRemove: number[] = []
  badGuyManager.badGuys.forEach( (badGuy, badGuyIdx) => {
    //console.log('Cleanup is running with ' + badGuyManager.badGuys.length + ' Badguys')
    bulletManager.bullets.forEach((bullet, bulletIdx) => {
      if (isCollision(badGuy, bullet)) {
        let bulletKB: Move = new Move('bulletKB', 2, 2, 1)
        bulletKB.direction = badGuy.posn.clone().sub(bullet.posn.clone()).normalize()
        bulletKB.queueMove(badGuy)
        if (bullet.name == "BasicFire") {
          bulletManager.bullets.splice(bulletIdx)
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
    badGuyManager.badGuys.splice(badGuyIdx, 1)
  })
  bulletManager.bullets.forEach((bullet, bulletIdx) => {
    if (isOob(bullet)) {
      bulletManager.bullets.splice(bulletIdx, 1)
    }
  })
}

const bulletsMoveToPosn = (dt: number) => {
  bulletManager.bullets.forEach((bullet, idx) => {
    bullet.movement.circleMove(bullet, dt)
  })
}

const badGuysMoveToPosn = (dt: number) => {
  badGuyManager.badGuys.forEach(badGuy => {
    badGuy.movement.circleMove(badGuy, dt)
  })
}

const circlesMove = (dt: number) => {
  circleMan.movement.circleMove(circleMan, dt)
  bulletsMoveToPosn(dt)
  badGuysMoveToPosn(dt)
}

export const update = (dt: number) => {
  badGuysCollisionForAll(dt)
  skillsUpdate(dt)
  cleanup()
  circlesMove(dt)
}