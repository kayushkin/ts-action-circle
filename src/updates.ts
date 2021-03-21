import { Fighter, circleMan, bullets, badGuys, orangeBullet, bullet, BadGuy } from "./circles"
import { actions, mousePosition, Actions } from "./inputs"
import { scale, addVec2D, normalize, reverseVec2D, subtractVec2D, } from "./vecs"
import { Move, moves } from "./movement"
import { isOob, isCollision, isClickingOnBadGuy, badGuyLastClicked } from "./detection"
import { isOnCD, SkillName, skills, _skills } from "./skills"
import { cloneObject } from "./util"

const queueMove = (fighter: Fighter, attemptedMove: Move) => {
  if (fighter.movement.time < 1 || fighter.movement.priority > (attemptedMove.priority - 1)) {
    fighter.movement = attemptedMove 
  }
}

const circleMove = (circleWithMove: any, dt: number) => {
  if (circleWithMove.movement.time >= 0 ){
    let adjustedSpeed = circleWithMove.movement.speed*(Math.min(dt, circleWithMove.movement.time))
    let dcircleWithMovePosn = scale(circleWithMove.movement.direction, adjustedSpeed)
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

const isSkillActivating = (skillName: SkillName): boolean => {
  switch (skillName) {
    case ('Grab'):
      return actions[skillName] && (!isOnCD(circleMan.skills[skillName])) && isClickingOnBadGuy()
    default:
      return (actions[skillName] && (!isOnCD(circleMan.skills[skillName])))
  }
}

const arrowKeysQueueMove = () => {
  let dPosn = {x:0, y:0}
  if (actions.up) dPosn.y -= 1
  if (actions.down) dPosn.y += 1
  if (actions.left) dPosn.x -= 1 
  if (actions.right) dPosn.x += 1
  dPosn = normalize(dPosn)
  let arrowKeyMove = cloneObject(moves.ArrowKeyMove)
  arrowKeyMove.direction = dPosn
  arrowKeyMove.speed = circleMan.spd
  queueMove(circleMan, arrowKeyMove)
}

type Fruit = 'apple' | 'orange'

let apple: Fruit = 'apple'
let orange: Fruit = 'orange'

let basket: {[name in Fruit]: Float64Array} = {
  apple: 'orange',
  orange: 'orange',
}

for(var fruit: Fruit in basket) {
  fruit
}

basket.apple

const skillEffects = () => {
  orangePull()
  for (var skill2: BigInt in skills) {
    //console.log('skills is' + skills)
    //console.log('skill is ' + skill)
    //console.log(keyValue)
    //if (keyValue[0] == ('Dash' | 'OrangeFire' | 'BasicFire' | 'Grab')) {console.log('IT IS THE THING')}
    let skill: SkillName = skill2 as SkillName
    //console.log(skill)
    if (isSkillActivating(skill)) {
      //console.log("isSkillActivating is true")
      circleMan.skills[skill].timeLeft = circleMan.skills[skill].cd
      if (skill == "BasicFire" || skill == "OrangeFire") {
        //console.log('hitting basic')
        let normalizedFiringVector = normalize(subtractVec2D(mousePosition, circleMan.posn))
        let bulletMove = cloneObject(moves[skill])
        let currentBullet = cloneObject(bullet)
        if (skill == "OrangeFire") {
          currentBullet = cloneObject(orangeBullet)
        }
        currentBullet.posn = circleMan.posn
        currentBullet.movement = bulletMove
        currentBullet.movement.direction = normalizedFiringVector
        bullets.push(currentBullet)
      }
      if (skill == "Dash"){
        let dash = cloneObject(moves.Dash)
        dash.direction = circleMan.movement.direction
        queueMove(circleMan, dash)
      }
      if (skill == "Grab") {
        badGuys.forEach( badGuy => {
          if (badGuy.id == badGuyLastClicked) {
            console.log("is a go")
            circleMan.skills.Grab.timeLeft = circleMan.skills.Grab.cd
            let grabObj = cloneObject(moves.Grab)
            grabObj.direction = normalize(subtractVec2D(circleMan.posn, badGuy.posn))
            queueMove(badGuy, grabObj)
          }
        })
      }
    }
  })
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
  cDsUpdate(dt)
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