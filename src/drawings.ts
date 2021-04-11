import { currentMenu } from './index'
import { currentLevel } from './menuUpdate'
import { Vec2D } from './vecs'

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

export type ImgInfo = {
  name: string,
  Posn: Vec2D,
  canvasPosn: Vec2D,
}

export type ButtonImgInfo = {
  dungeonOne: ImgInfo,
  dungeonTwo: ImgInfo,
  dungeonThree: ImgInfo,
  dungeonOneHL: ImgInfo,
  dungeonTwoHL: ImgInfo,
  dungeonThreeHL: ImgInfo
  options: ImgInfo,
  optionsHL: ImgInfo,
  quitGame: ImgInfo,
  quitGameHL: ImgInfo,
}

export const setupCanvas = () => {
  document.body.parentElement!.style.height = '100%'
  document.body.style.height = '100%'
  document.body.style.margin = '0'

  canvas.width = parseFloat(window.getComputedStyle(document.body).width)
  canvas.height = parseFloat(window.getComputedStyle(document.body).height)
  canvas.style.backgroundColor = 'gray'
  document.body.appendChild(canvas)
}

export let buttonImgInfo: ButtonImgInfo = {
  dungeonOne: {
    name: 'dungeonOne',
    Posn: new Vec2D(0, 0),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,50),
  },
  dungeonTwo: {
    name: 'dungeonTwo',
    Posn: new Vec2D(0, 32),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,100),
  },
  dungeonThree: {
    name: 'dungeonThree',
    Posn: new Vec2D(0, 64),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,150),
  },
  dungeonOneHL: {
    name: 'dungeonOneHL',
    Posn: new Vec2D(192, 0),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,50),
  },
  dungeonTwoHL: {
    name: 'dungeonTwoHL',
    Posn: new Vec2D(192, 32),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,100),
  },
  dungeonThreeHL: {
    name: 'dungeonThreeHL',
    Posn: new Vec2D(192, 64),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 - 220,150),
  },
  options: {
    name: 'options',
    Posn: new Vec2D(0, 96),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 + 28,50),
  },
  optionsHL: {
    name: 'optionsHL',
    Posn: new Vec2D(192, 96),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 + 28,50),
  },
  quitGame: {
    name: 'quitGame',
    Posn: new Vec2D(0, 128),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 + 28,100),
  },
  quitGameHL: {
    name: 'quitGameHL',
    Posn: new Vec2D(192, 128),
    canvasPosn: new Vec2D(parseFloat(window.getComputedStyle(document.body).width)/2 + 28,100),
 },
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
    console.log(bullet)
    bullet.draw(ctx, img)
  })
}

export const renderMenu = () => {
  ctx.fillStyle = 'gray' 
  ctx.fillRect(0, 0, canvas.width , canvas.height)

  currentMenu.buttons.forEach(button => {
    button.draw(ctx, buttonImg)
  })
  
  
  
  //TO DO: draw menu options
}