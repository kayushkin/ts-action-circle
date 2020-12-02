// document.createElement
// document.body.appendChild(...)
// someNode.style.someCssProperty = someShit


import { circleMan, badGuys, bullets } from "./circles"
import { drawCircle, canvas, ctx, setupCanvas } from './drawings'
import { cDsUpdate, firingUpdate, badGuysUpdate, circleManMoveUpdate, circlesPosnUpdate } from "./updates"

setupCanvas()

let lastFrame = Date.now()

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

loop()
