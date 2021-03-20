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

export const render = () => {
  if (ctx === null) return

  // clear screen
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  

  //ctx.drawImage(img, 0, 0, 96, 96, 0, 0, 96, 96)
  //ctx.drawImage(img, 96, 0, 96, 96, (circleMan.posn.x-(circleMan.radius)), (circleMan.posn.y-(circleMan.radius)), 96, 96)
  //drawCircle(circleMan)
  drawBlueHat(circleMan, img)
  badGuys.forEach(badGuy => {
    drawRedMonster(badGuy, img)
  })
  bullets.forEach(bullet => {
    drawBullet(bullet, img)
  })
}