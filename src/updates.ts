import { Fighter, circleMan, bullets, badGuys, orangeBullet, bullet, BadGuy } from "./circles"
import { keys, mousePosition } from "./inputs"
import { scale, addVec2D, normalize, reverseVec2D, subtractVec2D, } from "./vecs"
import { Move, moves } from "./movement"
import { isOob, isCollision, isClickingOnBadGuy } from "./detection"
import { isOnCD } from "./skills"

export let lastShot = Date.now()

export const moveUpdate = (fighter: Fighter, attemptedMove: Move) => {
    if (fighter.movement.time < 1 || fighter.movement.priority > (attemptedMove.priority - 1)) {
      fighter.movement = attemptedMove 
    }
  }
  
  export const circleMoveToPosnUpdate = (circleWithMove: any, dt: number) => {
    if (circleWithMove.movement.time >= 0 ){
      let dcircleWithMovePosn = scale(circleWithMove.movement.direction, circleWithMove.movement.speed)
      circleWithMove.posn = addVec2D(circleWithMove.posn, dcircleWithMovePosn)
      circleWithMove.movement.time -= dt
    }
}

export const cDsUpdate = (dt: number) => {
    Object.keys(circleMan.cDs).forEach(key => {
      circleMan.cDs[key].timeLeft -= dt
    })
    badGuys.forEach(badGuy => {
      Object.keys(badGuy.cDs).forEach(key => {
        badGuy.cDs[key].timeLeft -= dt
      })
    })
  }
  
export const arrowKeysPosnUpdate = () => {
  let dPosn = {x:0, y:0}
  if (keys.up) dPosn.y -= 1
  if (keys.down) dPosn.y += 1
  if (keys.left) dPosn.x -= 1 
  if (keys.right) dPosn.x += 1
  dPosn = normalize(dPosn)
  let arrowKeyMove = { ...moves["arrowKeyMove"]}
  arrowKeyMove.direction = dPosn
  arrowKeyMove.speed = circleMan.spd
  arrowKeyMove.time = 0
  moveUpdate(circleMan, arrowKeyMove)
}

export const dashUpdate = ()  => {
  let dash = { ...moves["dash"]}
  dash.direction = circleMan.movement.direction
  if (keys.shiftLeft && !isOnCD(circleMan.cDs["dash"])){
    circleMan.cDs["dash"].timeLeft = circleMan.cDs["dash"].cd
    moveUpdate(circleMan, dash)
  }
}

export const firingUpdate = () => {
  let normalizedFiringVector = normalize(subtractVec2D(mousePosition, circleMan.posn))
  if (keys.fire && (!isOnCD(circleMan.cDs["basic fire"]))) {
    circleMan.cDs["basic fire"].timeLeft = circleMan.cDs["basic fire"].cd
    let bulletMove = { ...moves["bulletMove"]}
    let currentBullet = {...bullet}
    currentBullet.posn = circleMan.posn
    currentBullet.movement = bulletMove
    currentBullet.movement.direction = normalizedFiringVector
    bullets.push(currentBullet)
    lastShot = Date.now()
  }
  if (keys.keyG && (!isOnCD(circleMan.cDs["orange fire"]))) {
    circleMan.cDs["orange fire"].timeLeft = circleMan.cDs["orange fire"].cd
    let bulletMove = { ...moves["orangeBulletMove"]}
    let currentBullet = { ...orangeBullet}
    currentBullet.posn = circleMan.posn
    currentBullet.movement = bulletMove
    currentBullet.movement.direction = normalizedFiringVector
    bullets.push(currentBullet)
    lastShot = Date.now()
  }
}

export const bulletsPosnUpdate = (dt: number) => {
  bullets.forEach((bullet, idx) => {
    circleMoveToPosnUpdate(bullet, dt)
    if (isOob(bullet)) {
      bullets.splice(idx, 1)
    }
    if (bullet.name == "orange fire") {
      badGuys.forEach(badguy => {
        let pushToOrange = {...moves["pushObj"]}
        pushToOrange.direction = normalize(subtractVec2D(bullet.posn, badguy.posn))
        moveUpdate(badguy, pushToOrange)
      })
    }
  })
}

const badGuysUpdate = (dt: number) => {
  badGuys.forEach((badGuy, badGuyIdx) => {
    badGuysCollisionDetection(badGuy, badGuyIdx)
    badGuysCleanup(badGuy, badGuyIdx)
  })
}

const badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
  badGuys.forEach((badGuyInner, badGuyIdx2) => {
    if (badGuyIdx == badGuyIdx2) {
      return
    } else if (isCollision(badGuy, badGuyInner)) {
      let pushObj = { ...moves["pushObj"]}
      pushObj.direction = normalize(subtractVec2D(badGuy.posn, badGuyInner.posn))
      moveUpdate(badGuy, pushObj)
      let reversePushObj = {...pushObj}
      reversePushObj.direction = reverseVec2D(reversePushObj.direction)
      moveUpdate(badGuyInner, reversePushObj)
    }
  })
  if (isCollision(badGuy, circleMan)) {
    let pushObj = { ...moves["pushObj"]}
    pushObj.direction = normalize(subtractVec2D(badGuy.posn, circleMan.posn))
    badGuy.movement = pushObj
  } 
}

const grabPosnUpdate = (badGuy: BadGuy) => {
  if (keys.keyR && (!isOnCD(circleMan.cDs["grab"])) && isClickingOnBadGuy()) {
    circleMan.cDs["grab"].timeLeft = circleMan.cDs["grab"].cd
    let grabObj = { ...moves["grabMove"]}
    grabObj.direction = normalize(subtractVec2D(circleMan.posn, badGuy.posn))
    moveUpdate(badGuy, grabObj)
  }
}

export const badGuysCleanup = (badGuy: BadGuy, badGuyIdx: number) => {
  bullets.forEach((bullet, bulletIdx) => {
    if (isCollision(badGuy, bullet)) {
      if (bullet.name == "basic fire") {
        bullets.splice(bulletIdx, 1)
        badGuy.hp -= 1
      }
      let bulletKB = { ...moves["bulletKB"]}
      bulletKB.direction = normalize(subtractVec2D(badGuy.posn, bullet.posn))
      moveUpdate(badGuy, bulletKB)
      if (badGuy.hp < 1) {
        badGuys.splice(badGuyIdx, 1)
      }
    }
  })
  if (isOob(badGuy)) {
    badGuys.splice(badGuyIdx, 1)
  }
}

export const badGuysPosnUpdate = (dt: number) => {
  badGuys.forEach(badGuy => {
    circleMoveToPosnUpdate(badGuy, dt)
    grabPosnUpdate(badGuy)
  })
}

export const circleManMoveUpdate = () => {
  arrowKeysPosnUpdate()
  dashUpdate()
}

export const circlesPosnUpdate = (dt: number) => {
  circleMoveToPosnUpdate(circleMan, dt)
  bulletsPosnUpdate(dt)
  badGuysPosnUpdate(dt)
}

export const update = (dt: number) => {
  circleManMoveUpdate()
  firingUpdate()
  badGuysUpdate(dt)
  cDsUpdate(dt)
  circlesPosnUpdate(dt)
}