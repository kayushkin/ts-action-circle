import { Circle, circleMan, badGuys, bullets } from './circles'

export let canvas = document.createElement('canvas')

export let ctx = canvas.getContext('2d')

export const setupCanvas = () => {
  document.body.parentElement!.style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = '0'

canvas.width = parseFloat(window.getComputedStyle(document.body).width)
canvas.height = parseFloat(window.getComputedStyle(document.body).height)
canvas.style.backgroundColor = 'gray'
document.body.appendChild(canvas)

}


export const drawCircle = (circle: Circle) => {
  if (ctx === null) return

  ctx.fillStyle = circle.color
  ctx.beginPath()
  ctx.arc(circle.posn.x, circle.posn.y, circle.radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}

export const render = () => {
  if (ctx === null) return

  // clear screen
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawCircle(circleMan)
  badGuys.forEach(drawCircle)
  bullets.forEach(drawCircle)
}