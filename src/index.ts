// document.createElement
// document.body.appendChild(...)
// someNode.style.someCssProperty = someShit

import { magnitude, normalize, scale, addVec2D, subtractVec2D, reverseVec2D, Vec2D } from "./vecs"
import { circleManSkillCDMap, CDinfo } from "./skills"
import { Move, moves } from "./movement"
import { Posn, Circle, Fighter, CircleMan, circleMan, Bullet, BadGuy, badGuys, greenBadGuy1, greenBadGuy2, greenBadGuy3, bullet, bullets, orangeBullet } from "./circles"

document.body.parentElement!.style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = '0'

let canvas = document.createElement('canvas')
canvas.width = parseFloat(window.getComputedStyle(document.body).width)
canvas.height = parseFloat(window.getComputedStyle(document.body).height)
canvas.style.backgroundColor = 'gray'
document.body.appendChild(canvas)

let ctx = canvas.getContext('2d')

let lastFrame = Date.now()
let lastShot = Date.now()

let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
  shiftLeft: false,
  keyG: false,
}

let mousePosition: Vec2D = {x: 200, y: 200}



const isCollision = (circle1: Circle, circle2: Circle) => {
  let differenceVec = subtractVec2D(circle1.posn, circle2.posn)
  if (magnitude(differenceVec) < (circle2.radius + circle1.radius)) {
    return true
  } else return false
}

const pushCircleAway = (circle1: Circle, circle2: Circle) => {

}

const drawCircle = (circle: Circle) => {
  if (ctx === null) return

  ctx.fillStyle = circle.color
  ctx.beginPath()
  ctx.arc(circle.posn.x, circle.posn.y, circle.radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}

const knockbackVec = (knockbacker: Circle, knockbackee: Circle, magnitude: number) => {
  let kbVec = subtractVec2D(knockbacker.posn, knockbackee.posn)
  let normalKbVec = normalize(kbVec)
  return scale(normalKbVec, magnitude)
}

const isOob = (circle: Circle) => {
  let x = circle.posn.x
  let y = circle.posn.y
  let distanceToRight = canvas.width + circle.radius
  let distanceToBottom = canvas.height + circle.radius
  return x < -circle.radius || x > distanceToRight || y < -circle.radius || y > distanceToBottom
}

const moveUpdate = (fighter: Fighter, attemptedMove: Move) => {
  if (fighter.movement.time < 1 || fighter.movement.priority > (attemptedMove.priority - 1)) {
    fighter.movement = attemptedMove 
  }
}

const circleMoveToPosnUpdate = (circleWithMove: any, dt: number) => {
  if (circleWithMove.movement.time >= 0 ){
    let dcircleWithMovePosn = scale(circleWithMove.movement.direction, circleWithMove.movement.speed)
    circleWithMove.posn = addVec2D(circleWithMove.posn, dcircleWithMovePosn)
    circleWithMove.movement.time -= dt
  }
}

const circlePosnUpdate = (circle: Circle, dPosn: Posn) => {
  circle.posn = addVec2D(circle.posn, dPosn)
}

const isOnCD = (ability: CDinfo): boolean => {
  if(ability.timeLeft > 0) {
    return true
  }
  return false
}

const cDsUpdate = (dt: number) => {
  Object.keys(circleMan.cDs).forEach(key => {
    circleMan.cDs[key].timeLeft -= dt
  })
  badGuys.forEach(badGuy => {
    Object.keys(badGuy.cDs).forEach(key => {
      badGuy.cDs[key].timeLeft -= dt
    })
  })
}

const arrowKeysPosnUpdate = () => {
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

const dashUpdate = ()  => {
  let dash = { ...moves["dash"]}
  dash.direction = circleMan.movement.direction
  if (keys.shiftLeft && !isOnCD(circleMan.cDs["dash"])){
    circleMan.cDs["dash"].timeLeft = circleMan.cDs["dash"].cd
    moveUpdate(circleMan, dash)
  }
}

const firingUpdate = () => {
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
    let currentBullet = {...orangeBullet}
    currentBullet.posn = circleMan.posn
    currentBullet.movement = bulletMove
    currentBullet.movement.direction = normalizedFiringVector
    bullets.push(currentBullet)
    lastShot = Date.now()
  }
}

const bulletsPosnUpdate = (dt: number) => {
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
    if (isOob(badGuy)) {
      badGuys.splice(badGuyIdx, 1)
    } else if (isCollision(badGuy, circleMan)) {
      let pushObj = { ...moves["pushObj"]}
      pushObj.direction = normalize(subtractVec2D(badGuy.posn, circleMan.posn))
      badGuy.movement = pushObj
    } else {
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
    })}
  })
}

const badGuysPosnUpdate = (dt: number) => {
  badGuys.forEach(badGuy => {
    circleMoveToPosnUpdate(badGuy, dt)
  })
}

const circleManMoveUpdate = () => {
  arrowKeysPosnUpdate()
  dashUpdate()
}

const circlesPosnUpdate = (dt: number) => {
  circleMoveToPosnUpdate(circleMan, dt)
  bulletsPosnUpdate(dt)
  badGuysPosnUpdate(dt)
}

const loop = () => {
  window.requestAnimationFrame(loop)
  let time = Date.now()
  update(time - lastFrame) // TODO delta
  render()
  lastFrame = time
}

const render = () => {
  if (ctx === null) return

  // clear screen
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawCircle(circleMan)
  badGuys.forEach(drawCircle)
  bullets.forEach(drawCircle)
}

const update = (dt: number) => {
  circleManMoveUpdate()
  firingUpdate()
  badGuysUpdate(dt)
  cDsUpdate(dt)
  circlesPosnUpdate(dt)
}

window.addEventListener('keydown', evt => {
  window.addEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      keys.up = true
      break
    case 'KeyD':
      keys.down = true
      break
    case 'KeyS':
      keys.left = true
      break
    case 'KeyF':
      keys.right = true
      break
    case 'ShiftLeft':
      keys.shiftLeft = true
      break
    case 'KeyG':
      keys.keyG = true
      break
  }
})


const logKey = (e: any) => {
  console.log(e.code)
}
document.addEventListener('keydown', logKey);

const onMouseMove = (evt: MouseEvent) => {
  mousePosition = {x: evt.pageX, y: evt.pageY}
}

window.addEventListener('mousedown', evt => {
  keys.fire = true
  mousePosition = {x: evt.pageX, y: evt.pageY}
  window.addEventListener('mousemove', onMouseMove)
})



window.addEventListener('mouseup', evt => {
  keys.fire = false
  window.removeEventListener('mousemove', onMouseMove)
})

window.addEventListener('keyup', evt => {
  window.removeEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      keys.up = false
      break
    case 'KeyD':
      keys.down = false
      break
    case 'KeyS':
      keys.left = false
      break
    case 'KeyF':
      keys.right = false
      break
    case 'ShiftLeft':
      keys.shiftLeft = false
      break
    case 'KeyG':
      keys.keyG = false
      break
  }
})

loop()
