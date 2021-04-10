import { CircleMan, badGuyManager, bulletManager, Fighter, BadGuy, Bullet } from "./graphics"
import { actions } from "./inputs"
import { Vec2D, } from "./vecs"
import { Move } from "./movement"
import { isOob, isCollision } from "./detection"


export class Level {
    constructor(
        public badGuys: BadGuy[],
        public circleMan: CircleMan,
        public bullets: Bullet[]
    ) {}

    badGuysCollisionDetection = (badGuy: BadGuy, badGuyIdx: number) => {
        badGuyManager.badGuys.forEach((otherBadGuy, otherBadGuyIdx) => {
          if (badGuyIdx == otherBadGuyIdx) {
            return
          } else if (isCollision(badGuy, otherBadGuy)) {
            let pushObj: Move = new Move('pushObj', 5, 1, 5)
            pushObj.direction = badGuy.posn.clone().sub(otherBadGuy.posn).normalize()
            pushObj.queueMove(badGuy)
            let reversePushObj: Move = new Move('reversePushObj', 5, 1, 5)
            reversePushObj.direction = pushObj.direction.clone().neg()
            reversePushObj.queueMove(otherBadGuy)
          }
        })
        if (isCollision(badGuy, this.circleMan)) {
          let pushObj = new Move('pushObj', 5, 1, 5)
          pushObj.direction = badGuy.posn.clone().sub(this.circleMan.posn).normalize()
          pushObj.queueMove(badGuy)
        } 
      }
      
      badGuysCollisionForAll = (dt: number) => {
        badGuyManager.badGuys.forEach((badGuy, badGuyIdx) => {
          this.badGuysCollisionDetection(badGuy, badGuyIdx)
        })
      }
      
      orangePull = () => {
        bulletManager.bullets.forEach((bullet) => {
          if (bullet.name == "OrangeFire") {
            badGuyManager.badGuys.forEach(badguy => {
              let pushToOrange: Move = new Move('pushObj', 5, 1, 3)
              pushToOrange.direction = bullet.posn.clone().sub(badguy.posn).normalize()
              pushToOrange.queueMove(badguy)
            })
          }
        })
      }
      
      skillEffects = () => {
        this.orangePull()
        for (let skill of this.circleMan.skills) {
          if (skill.isActivating()) { 
            skill.cast() }
        }
      }
      
      arrowKeysQueueMove = () => {
        let dPosn: Vec2D = Vec2D.default()
        if (actions.up) dPosn.y -= 1
        if (actions.down) dPosn.y += 1
        if (actions.left) dPosn.x -= 1 
        if (actions.right) dPosn.x += 1
        dPosn = dPosn.normalize()
        let arrowKeyMove: Move = new Move('arrowKey', 10, 1, 1000)
        arrowKeyMove.direction = dPosn
        arrowKeyMove.speed = this.circleMan.spd
        arrowKeyMove.queueMove(this.circleMan)
      }
      
      skillsUpdate = (dt: number) => {
        this.skillEffects()
        this.arrowKeysQueueMove()
      }
      
      cleanup = () => {
        let badGuysToRemove: number[] = []
        let bulletsToRemove: number[] = []
        badGuyManager.badGuys.forEach( (badGuy, badGuyIdx) => {
          //console.log('Cleanup is running with ' + badGuyManager.badGuys.length + ' Badguys')
          bulletManager.bullets.forEach((bullet, bulletIdx) => {
            if (isCollision(badGuy, bullet)) {
              let bulletKB: Move = new Move('bulletKB', 2, 2, 1)
              bulletKB.direction = badGuy.posn.clone().sub(bullet.posn.clone()).normalize()
              bulletKB.queueMove(badGuy)
              if (bullet.name == "BasicFire") {
                bulletsToRemove.push(bulletIdx)
                badGuy.hp -= 1
              }
              if (badGuy.hp < 1) {
                badGuysToRemove.push(badGuyIdx)
              }
            }
          })
          if (isOob(badGuy)) {
            badGuysToRemove.push(badGuyIdx)
          }
        })
        badGuysToRemove.forEach((badGuyIdx) => {
          badGuyManager.badGuys.splice(badGuyIdx, 1)
        })
        bulletManager.bullets.forEach((bullet, bulletIdx) => {
          if (isOob(bullet)) {
            bulletsToRemove.push(bulletIdx)
          }
        })
        bulletsToRemove.forEach((bulletIdx) => {
          bulletManager.bullets.splice(bulletIdx, 1)
        })
      }
      
      bulletsMoveToPosn = (dt: number) => {
        bulletManager.bullets.forEach((bullet, idx) => {
          bullet.movement.circleMove(bullet, dt)
        })
      }
      
      badGuysMoveToPosn = (dt: number) => {
        badGuyManager.badGuys.forEach(badGuy => {
          badGuy.movement.circleMove(badGuy, dt)
        })
      }
      
      circlesMove = (dt: number) => {
        this.circleMan.movement.circleMove(this.circleMan, dt)
        this.bulletsMoveToPosn(dt)
        this.badGuysMoveToPosn(dt)
      }
      
      update = (dt: number) => {
        this.badGuysCollisionForAll(dt)
        this.skillsUpdate(dt)
        this.cleanup()
        this.circlesMove(dt)
      }
}