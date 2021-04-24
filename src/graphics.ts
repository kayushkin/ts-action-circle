import { Move, AutoMove } from "./movement"
import { BasicFire, Dash, Grab, OrangeFire, Skill } from "./skills"
import { Vec2D } from './vecs'
import { mousePosition, Actions, actions } from './inputs'
import { ctx, ImgInfo, ImageFrames,  } from "./drawings"

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
  constructor(public buttonFrames: ImageFrames){}
  width: number = 192
  height: number = 32
  hoveredOver: boolean = false
  frame: number = 0

  isHoveredOver() {
    let mouseWithinX: Boolean = mousePosition.x > this.buttonFrames[this.frame].canvasPosn.x && mousePosition.x < 192 + this.buttonFrames[this.frame].canvasPosn.x;
    let mouseWithinY: Boolean = mousePosition.y > this.buttonFrames[this.frame].canvasPosn.y && mousePosition.y < 32 + this.buttonFrames[this.frame].canvasPosn.y;
    (mouseWithinX && mouseWithinY) ? this.hoveredOver = true : this.hoveredOver = false
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
  draw(ctx: CanvasRenderingContext2D, image: any, frame: number) {
    ctx.drawImage(image, this.buttonFrames[this.frame].Posn.x, this.buttonFrames[this.frame].Posn.y, 192, 32, this.buttonFrames[this.frame].canvasPosn.x, this.buttonFrames[0].canvasPosn.y, 192, 32)
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
        ctx.drawImage(image, 208, 64, 18, 18, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 18, 18)
        break
      case ('OrangeFire'):
        let spriteCoords: Vec2D = new Vec2D(0 ,0);
        (Date.now() % 2) ? spriteCoords = new Vec2D(190, 64) : spriteCoords = new Vec2D(208, 64)
        ctx.drawImage(image, spriteCoords.x , spriteCoords.y, 18, 18, (this.posn.x-(this.radius)), (this.posn.y-(this.radius)), 18, 18)
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