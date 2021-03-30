import { Move, AutoMove } from "./movement"
import { BasicFire, Dash, Grab, OrangeFire, Skill } from "./skills"
import { Vec2D } from './vecs'

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

export class Bullet implements Circle {
  constructor(
    public name: string,
    public posn: Vec2D,
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

export let circleMan: CircleMan = new CircleMan(
  new Vec2D(100, 100),
  48,
  5,
  new Move('notMoving', 10, 0, 0),
  0.4,
)

export let badGuyManager: BadGuyManager = new BadGuyManager()

badGuyManager.newBasic(new Vec2D(200,400))
badGuyManager.newBasic(new Vec2D(400,200))
badGuyManager.newBasic(new Vec2D(200,250))

export let bulletManager: BulletManager = new BulletManager()
