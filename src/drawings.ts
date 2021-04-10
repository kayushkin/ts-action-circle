import { currentMenu } from './index'
import { currentLevel } from './menuUpdate'

export let canvas = document.createElement('canvas')

export let ctx = canvas.getContext('2d')!

export var imgPath = './src/assets/placeholders/placeholder_tokens.png'
export var buttonImgPath = './src/assets/placeholders/main_Menu_buttons_spritesheet.png'

export var img = document.createElement('img') 
img.style.display = "none"
img.src = imgPath 
document.body.appendChild(img)

export var buttonImg = document.createElement('img') 
buttonImg.style.display = "none"
buttonImg.src = buttonImgPath 
document.body.appendChild(buttonImg)

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

  currentLevel.circleMan.draw(ctx, img)
  currentLevel.badGuys.forEach(badGuy => {
    badGuy.drawBasic(ctx, img)
  })
  currentLevel.bullets.forEach(bullet => {
    bullet.draw(ctx, img)
  })
}

export const renderMenu = () => {
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  currentMenu.buttons.forEach(button => {
    button.draw(ctx, buttonImg)
  })
  
  
  
  //TO DO: draw menu options
}