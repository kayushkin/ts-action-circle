import { circleMan, badGuyManager, bulletManager, Fighter, BadGuy, Bullet } from "./circles"
import { actions, mousePosition, Actions } from "./inputs"
import { Vec2D, } from "./vecs"
import { Move, moves } from "./movement"
import { isOob, isCollision, mousedOverBadGuy } from "./detection"
import { cloneObject } from "./util"

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
      skill.cast() }
  }
}


const badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
  badGuyManager.badGuys.forEach((otherBadGuy, otherBadGuyIdx) => {
    if (badGuyIdx == otherBadGuyIdx) {
      return
    } else if (isCollision(badGuy, otherBadGuy)) {
      let pushObj = cloneObject(moves.PushObj)
      pushObj.direction = badGuy.posn.sub(otherBadGuy.posn).normalize()
      queueMove(badGuy, pushObj)
      let reversePushObj = {...pushObj}
      reversePushObj.direction = reversePushObj.direction.neg()
      queueMove(otherBadGuy, reversePushObj)
    }
  })
  if (isCollision(badGuy, circleMan)) {
    let pushObj = cloneObject(moves.PushObj)
    pushObj.direction = badGuy.posn.sub(circleMan.posn).normalize()
    badGuy.movement = pushObj
  } 
}

const cleanup = () => {
  let badGuysToRemove: number[] = []
  badGuyManager.badGuys.forEach( (badGuy, badGuyIdx) => {
    //console.log('Cleanup is running with ' + badGuyManager.badGuys.length + ' Badguys')
    bulletManager.bullets.forEach((bullet, bulletIdx) => {
      if (isCollision(badGuy, bullet)) {
        let bulletKB = cloneObject(moves.BulletKB)
        bulletKB.direction = badGuy.posn.sub(bullet.posn).normalize()
        queueMove(badGuy, bulletKB)
        if (bullet.name == "basic fire") {
          badGuysToRemove.push(badGuyIdx)
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

const orangePull = () => {
  bulletManager.bullets.forEach((bullet) => {
    if (bullet.name == "orange fire") {
      badGuyManager.badGuys.forEach(badguy => {
        let pushToOrange = cloneObject(moves.PushObj)
        pushToOrange.direction = bullet.posn.sub(badguy.posn).normalize()
        queueMove(badguy, pushToOrange)
      })
    }
  })
}

const bulletsMoveToPosn = (dt: number) => {
  bulletManager.bullets.forEach((bullet, idx) => {
    circleMove(bullet, dt)
  })
}

const skillsUpdate = (dt: number) => {
  skillEffects()
  arrowKeysQueueMove()
}

const badGuysQueueMove = (dt: number) => {
  badGuyManager.badGuys.forEach((badGuy, badGuyIdx) => {
    badGuysCollisionDetection(badGuy, badGuyIdx)
  })
}

const badGuysMoveToPosn = (dt: number) => {
  badGuyManager.badGuys.forEach(badGuy => {
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