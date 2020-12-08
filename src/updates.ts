import { Fighter, circleMan, bullets, badGuys, orangeBullet, bullet, BadGuy } from "./circles"
import { keys, mousePosition } from "./inputs"
import { scale, addVec2D, normalize, reverseVec2D, subtractVec2D, } from "./vecs"
import { Move, moves } from "./movement"
import { isOob, isCollision, isClickingOnBadGuy, badGuyLastClicked } from "./detection"
import { isOnCD, skillsList } from "./skills"
import { cloneObject } from "./util"

let lastShot = Date.now()

const queueMove = (fighter: Fighter, attemptedMove: Move) => {
  if (fighter.movement.time < 1 || fighter.movement.priority > (attemptedMove.priority - 1)) {
    fighter.movement = attemptedMove 
  }
}

const circleMove = (circleWithMove: any, dt: number) => {
  if (circleWithMove.movement.time >= 0 ){
    let dcircleWithMovePosn = scale(circleWithMove.movement.direction, circleWithMove.movement.speed)
    circleWithMove.posn = addVec2D(circleWithMove.posn, dcircleWithMovePosn)
    circleWithMove.movement.time -= dt
  }
}

const cDsUpdate = (dt: number) => {
  Object.keys(circleMan.skills).forEach(key => {
    circleMan.skills[key].timeLeft -= dt
  })
  badGuys.forEach(badGuy => {
    Object.keys(badGuy.skills).forEach(key => {
      badGuy.skills[key].timeLeft -= dt
    })
  })
}

const isSkillActivating = (skillName: String): boolean => {
  switch (skillName) {
    case "basic fire": {
      return keys.fire && (!isOnCD(circleMan.skills["basic fire"]))
    }
    case "orange fire":{
      return keys.keyG && (!isOnCD(circleMan.skills["orange fire"]))
    }
    case "dash":{
      return keys.shiftLeft && !isOnCD(circleMan.skills["dash"])
    }
    case "grab":{
      return keys.keyR && (!isOnCD(circleMan.skills["grab"])) && isClickingOnBadGuy()
    }
  }
  return false
}

const arrowKeysQueueMove = () => {
  let dPosn = {x:0, y:0}
  if (keys.up) dPosn.y -= 1
  if (keys.down) dPosn.y += 1
  if (keys.left) dPosn.x -= 1 
  if (keys.right) dPosn.x += 1
  dPosn = normalize(dPosn)
  let arrowKeyMove = cloneObject(moves["arrowKeyMove"])
  arrowKeyMove.direction = dPosn
  arrowKeyMove.speed = circleMan.spd
  queueMove(circleMan, arrowKeyMove)
}

const skillQueueMove = () => {
  Object.keys(skillsList).forEach( skill => {
    if (isSkillActivating(skill)) {
      circleMan.skills[skill].timeLeft = circleMan.skills[skill].cd
      if (skill == "basic fire" || skill == "orange fire") {
        let normalizedFiringVector = normalize(subtractVec2D(mousePosition, circleMan.posn))
        let bulletMove = cloneObject(moves[skill])
        let currentBullet = cloneObject(bullet)
        if (skill == "orange fire") {
          currentBullet = cloneObject(orangeBullet)
        }
        currentBullet.posn = circleMan.posn
        currentBullet.movement = bulletMove
        currentBullet.movement.direction = normalizedFiringVector
        bullets.push(currentBullet)
        lastShot = Date.now()
      }
      if (skill == "dash"){
        let dash = cloneObject(moves["dash"])
        dash.direction = circleMan.movement.direction
        queueMove(circleMan, dash)
      }
      if (skill == "grab") {
        badGuys.forEach( badGuy => {
          if (badGuy.id == badGuyLastClicked) {
            console.log("is a goo")
            circleMan.skills["grab"].timeLeft = circleMan.skills["grab"].cd
            let grabObj = cloneObject(moves["grab"])
            grabObj.direction = normalize(subtractVec2D(circleMan.posn, badGuy.posn))
            queueMove(badGuy, grabObj)
          }
        })
      }
    }
  })
}

const badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
  badGuys.forEach((badGuyInner, badGuyIdx2) => {
    if (badGuyIdx == badGuyIdx2) {
      return
    } else if (isCollision(badGuy, badGuyInner)) {
      let pushObj = cloneObject(moves["pushObj"])
      pushObj.direction = normalize(subtractVec2D(badGuy.posn, badGuyInner.posn))
      queueMove(badGuy, pushObj)
      let reversePushObj = {...pushObj}
      reversePushObj.direction = reverseVec2D(reversePushObj.direction)
      queueMove(badGuyInner, reversePushObj)
    }
  })
  if (isCollision(badGuy, circleMan)) {
    let pushObj = cloneObject(moves["pushObj"])
    pushObj.direction = normalize(subtractVec2D(badGuy.posn, circleMan.posn))
    badGuy.movement = pushObj
  } 
}

const badGuysCleanup = (badGuy: BadGuy, badGuyIdx: number) => {
  bullets.forEach((bullet, bulletIdx) => {
    if (isCollision(badGuy, bullet)) {
      if (bullet.name == "basic fire") {
        bullets.splice(bulletIdx, 1)
        badGuy.hp -= 1
      }
      let bulletKB = cloneObject(moves["bulletKB"])
      bulletKB.direction = normalize(subtractVec2D(badGuy.posn, bullet.posn))
      queueMove(badGuy, bulletKB)
      if (badGuy.hp < 1) {
        badGuys.splice(badGuyIdx, 1)
      }
    }
  })
  if (isOob(badGuy)) {
    badGuys.splice(badGuyIdx, 1)
  }
}

const bulletKB = (skillName: String) => {
  bullets.forEach((bullet) => {
    if (bullet.name == skillName) {
      badGuys.forEach(badguy => {
        let pushToOrange = cloneObject(moves["pushObj"])
        pushToOrange.direction = normalize(subtractVec2D(bullet.posn, badguy.posn))
        queueMove(badguy, pushToOrange)
      })
    }
  })
}

const orangeFire = () => {
  bulletKB("orange fire")
}

const bulletsMoveToPosn = (dt: number) => {
  bullets.forEach((bullet, idx) => {
    circleMove(bullet, dt)
    if (isOob(bullet)) {
      bullets.splice(idx, 1)
    }
  })
}

const skillsUpdate = (dt: number) => {
  cDsUpdate(dt)
  skillQueueMove()
  arrowKeysQueueMove()
  orangeFire()
}

const badGuysMove = (dt: number) => {
  badGuys.forEach((badGuy, badGuyIdx) => {
    badGuysCollisionDetection(badGuy, badGuyIdx)
    badGuysCleanup(badGuy, badGuyIdx)
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
  badGuysMove(dt)
  skillsUpdate(dt)
  circlesMove(dt)
}