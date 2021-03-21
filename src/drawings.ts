import { Circle, circleMan, badGuys, bullets, Bullet } from './circles'

export let canvas = document.createElement('canvas')

export let ctx = canvas.getContext('2d')

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

export const drawCircle = (circle: Circle) => {
  if (ctx === null) return

  ctx.fillStyle = circle.color
  ctx.beginPath()
  ctx.arc(circle.posn.x, circle.posn.y, circle.radius, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
}

export const drawBlueHat = (circle: Circle, image: any) => {
  if (ctx === null) return

  ctx.drawImage(image, 0, 0, 96, 96, (circle.posn.x-(circle.radius)), (circle.posn.y-(circle.radius)), 96, 96)
}

export const drawRedMonster = (circle: Circle, image: any) => {
  if (ctx === null) return

  ctx.drawImage(image, 96, 0, 95.5, 96, (circle.posn.x-(circle.radius)), (circle.posn.y-(circle.radius)), 96, 96)
}

export const drawBullet = (bullet: Bullet, image: any) => {
  if (ctx === null) return

  if (bullet.name == 'orange fire') {
    ctx.drawImage(image, 190, 64, 96, 96, (bullet.posn.x-(bullet.radius)), (bullet.posn.y-(bullet.radius)), 96, 96)
  } else{
    ctx.drawImage(image, 208, 64, 96, 96, (bullet.posn.x-(bullet.radius)), (bullet.posn.y-(bullet.radius)), 96, 96)
  }
  }

export const renderLevel = () => {
  if (ctx === null) return

  // clear screen
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawBlueHat(circleMan, img)
  badGuys.forEach(badGuy => {
    drawRedMonster(badGuy, img)
  })
  bullets.forEach(bullet => {
    drawBullet(bullet, img)
  })
}

export const renderMenu = () => {
  if (ctx === null) return

  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  
  ctx.fillStyle = 'red' 
  ctx.fillRect(100, 100, canvas.width- 500, canvas.height - 500)
  
  //TODO: draw menu options
}