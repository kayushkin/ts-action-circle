import { Fighter, Posn } from './circles'
import { actions, mousePosition } from './inputs'
import { mousedOverBadGuy } from './detection'
import { Move } from './movement'

export type skillName = 'up' | 'down' | 'left' | 'right' | 'BasicFire' | 'OrangeFire' | 'Dash' | 'Grab'

export abstract class Skill {  
  lastCast: number

  constructor(public name: skillName, public cd: number, public fighter: Fighter) {
    this.lastCast = 0
    
  }

  isOnCooldown(): boolean { return this.cd < Date.now() - this.lastCast }

  pressingKey(): boolean { return actions[this.name] }

  isActivating(): boolean { return this.pressingKey() && !this.isOnCooldown && this.activatingQualifier() }

  activatingQualifier(): boolean { return true }

  cast() {
    this.lastCast = Date.now()
    this.onCast()
  }

  abstract onCast(): any
}

export class BasicFire extends Skill {
  constructor(fighter: Fighter) {
    super("BasicFire", 1750, fighter)
  }

  onCast() {
    //if (skill.name == "BasicFire" || skill.name == "OrangeFire") {
    //  let normalizedFiringVector = normalize(subtractVec2D(mousePosition, circleMan.posn))
    //  let bulletMove = cloneObject(moves[skill])
    //  let currentBullet = cloneObject(bullet)
    //  if (skill == "OrangeFire") {
    //    //currentBullet = cloneObject(orangeBullet)
    //    bulletManager.newOrange(circleMan.posn)
    //  }
    //  //currentBullet.posn = circleMan.posn
    //  //currentBullet.movement = bulletMove
    //  //currentBullet.movement.direction = normalizedFiringVector
    //  //bullets.push(currentBullet)
    //  bulletManager.newBasic(circleMan.posn)
    //}
  }
}
export class OrangeFire extends Skill {
  constructor(fighter: Fighter) {
    super("OrangeFire", 1750, fighter)
  }

  onCast() {
    // dashing logic
  }
}

export class Dash extends Skill {
  constructor(fighter: Fighter) {
    super("Dash", 1750, fighter)
  }

  onCast() {
    //if (skill.name == "Dash"){
    //  let dash = cloneObject(moves.Dash)
    //  dash.direction = circleMan.movement.direction
    //  queueMove(circleMan, dash)
    //}
  }
}

export class Grab extends Skill {
  constructor(fighter: Fighter) {
    super("Grab", 5000, fighter)
  }

  activatingQualifier(): boolean { return !(null == mousedOverBadGuy) }

  onCast() {
    //if (skill.name == "Grab") {
      //  badGuys.forEach( badGuy => {
      //    if (badGuy.id == badGuyLastClicked) {
      //      console.log("is a go")
      //      circleMan.skills.Grab.timeLeft = circleMan.skills.Grab.cd
      //      let grabObj = cloneObject(moves.Grab)
      //      grabObj.direction = normalize(subtractVec2D(circleMan.posn, badGuy.posn))
      //      queueMove(badGuy, grabObj)
      //    }
      //  })
  }
}

