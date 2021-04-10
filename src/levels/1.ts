import { Level } from '../levelUpdate'
import { BadGuyManager, BulletManager, CircleMan } from '../graphics'
import { Vec2D } from '../vecs'
import { Move } from '../movement'

export let badGuyManager: BadGuyManager = new BadGuyManager()

badGuyManager.newBasic(new Vec2D(200,400))
badGuyManager.newBasic(new Vec2D(400,200))
badGuyManager.newBasic(new Vec2D(200,250))

export let circleMan: CircleMan = new CircleMan(
    new Vec2D(100, 100),
    48,
    5,
    new Move('notMoving', 10, 0, 0),
    0.4,
  )

export let bulletManager: BulletManager = new BulletManager()

export let level1: Level = new Level(
    badGuyManager.badGuys, 
    circleMan, 
    bulletManager.bullets)