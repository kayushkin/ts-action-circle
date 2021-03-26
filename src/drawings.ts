import { circleMan, badGuyManager, bulletManager } from './circles'

export let canvas = document.createElement('canvas')

export let ctx = canvas.getContext('2d')!

export var imgPath = './src/assets/placeholders/placeholder_tokens.png'

export var img = document.createElement('img') 
img.style.display = "none"
img.src = imgPath 
document.body.appendChild(img)

export const setupCanvas = () => {
  document.body.parentElement!.style.height = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'

  canvas.width = parseFloat(window.getComputedStyle(document.body).width)
  canvas.height = parseFloat(window.getComputedStyle(document.body).height)
  canvas.style.backgroundColor = 'gray'
  document.body.appendChild(canvas)
}

//export const drawCircle = (circle: Circle) => {
//  ctx.beginPath()
//  ctx.arc(circle.posn.x, circle.posn.y, circle.radius, 0, 2 * Math.PI)
//  ctx.closePath()
//  ctx.fill()
//}

export const renderLevel = () => {
  // clear screen
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  circleMan.draw(ctx, img)
  badGuyManager.badGuys.forEach(badGuy => {
    badGuy.drawBasic(ctx, img)
  })
  bulletManager.bullets.forEach(bullet => {
    bullet.draw(ctx, img)
  })
}

export const renderMenu = () => {
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  
  ctx.fillStyle = 'red' 
  ctx.fillRect(100, 100, canvas.width- 500, canvas.height - 500)
  
  //TODO: draw menu options
}