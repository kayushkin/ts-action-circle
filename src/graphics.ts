import { Move, AutoMove } from "./movement"
import { BasicFire, Dash, Grab, OrangeFire, Skill } from "./skills"
import { Vec2D } from './vecs'
import { mousePosition, Actions, actions } from './inputs'
import { ctx, ImgInfo } from "./drawings"

export type Posn = Vec2D

export interface Id {
  id: number
}

export interface Circle {
  posn: Posn
  radius: number
}

export interface Drawable {
  img: HTMLImageElement
}

export class Button {
  constructor(public buttonInfo: ImgInfo){}
  width: number = 192
  height: number = 32
  hoveredOver: boolean = false

  isHoveredOver() {
    if (mousePosition.x > this.buttonInfo.canvasPosn.x && mousePosition.x < 192 + this.buttonInfo.canvasPosn.x) {
      if (mousePosition.y > this.buttonInfo.canvasPosn.y && mousePosition.y < 32 + this.buttonInfo.canvasPosn.y) {
        this.hoveredOver = true
      }
    } else {
      this.hoveredOver = false
    }
  }
  isClickedOn() {
    if(actions.BasicFire && this.hoveredOver) {
      return true;
    }
  }
  isUnclickedOn() {
    if(!actions.BasicFire && this.hoveredOver) {
      return true;
    }
  }
  draw(ctx: CanvasRenderingContext2D, image: any) {
    ctx.drawImage(image, this.buttonInfo.Posn.x, this.buttonInfo.Posn.y, 192, 32, this.buttonInfo.canvasPosn.x, this.buttonInfo.canvasPosn.y, 192, 32)
  }
}

export class Bullet implements Circle {
  constructor(
    public name: string,
    public posn: Posn,
    public radius: number,
    public movement: Move,
  ) {}

  draw(ctx: CanvasRenderingContext2D, image: any) {
    switch (this.name) {
      case ('BasicFire'):
        ctx.drawImage(image, 208, 64, 96, 96, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 96, 96)
        break
      case ('OrangeFire'):
        ctx.drawImage(image, 190, 64, 96, 96, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 96, 96)
        break        
    }
  }
}

export class BulletManager {
  bullets: Bullet[] = []

  newBasic(startPosn: Posn, bulletMove: Move) {
    this.bullets.push(
      new Bullet(
        "BasicFire",
        startPosn.clone(),
        5,
        bulletMove
      )
    )
  }
  newOrange(startPosn: Posn, bulletMove: Move) {
    this.bullets.push(
      new Bullet(
        "OrangeFire",
        startPosn.clone(),
        30,
        bulletMove
      )
    )
  }
}

export type Fighter = Circle & {
  hp: number
  movement: Move
  spd: number
}

export class BadGuy implements Id, Fighter {
  constructor(
    public id: number,
    public posn: Vec2D,
    public radius: number,
    public spd: number,
    public hp: number,
    public movement: Move,
  ) {}

  drawBasic(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
    ctx.drawImage(image, 96, 0, 95.5, 96, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 96, 96)
  }
}

export class BadGuyManager {
  badGuys: BadGuy[] = []
  nextId = 0

  newBasic(startPosn: Posn) {
    this.badGuys.push(
      new BadGuy(
        this.nextId,
        startPosn.clone(),
        48,
        0.125,
        7,
        new Move('notMoving', 10, 0, 0),
      )
    )
    this.nextId++
  }
}

export class CircleMan implements Fighter {
  dash: Dash = new Dash(this)
  grab: Grab = new Grab(this)
  basicFire: BasicFire = new BasicFire(this)
  orangeFire: OrangeFire = new OrangeFire(this)
  skills: Skill[] = [this.dash, this.grab, this.orangeFire, this.basicFire]
  constructor(
    public posn: Posn,
    public radius: number,
    public hp: number,
    public movement: Move,
    public spd: number
    ) {}

  draw(ctx: CanvasRenderingContext2D, image: any) {
    ctx.drawImage(image, 0, 0, 96, 96, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 96, 96)
  }
}

export let badGuyManager: BadGuyManager = new BadGuyManager()

export let bulletManager: BulletManager = new BulletManager()