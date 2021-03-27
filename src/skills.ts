import { Fighter, Posn, circleMan, bulletManager, badGuyManager } from './circles'
import { actions, mousePosition } from './inputs'
import { mousedOverBadGuy } from './detection'
import { Move, moves } from './movement'
import { cloneObject } from './util'

export type skillName = 'up' | 'down' | 'left' | 'right' | 'BasicFire' | 'OrangeFire' | 'Dash' | 'Grab'

export abstract class Skill {  
  lastCast: number

  constructor(public name: skillName, public cd: number, public fighter: Fighter) {
    this.lastCast = 0
    
  }

  isOffCooldown(): boolean { return this.cd < Date.now() - this.lastCast }

  pressingKey(): boolean { return actions[this.name] }

  isActivating(): boolean { return this.pressingKey() && this.isOffCooldown() && this.activatingQualifier() }

  activatingQualifier(): boolean { return true }

  cast() {
    console.log('### cast is activating isOffCD = ' + this.isActivating() + ' ### skill off cd ' + this.isOffCooldown() + ' ### this.cd = ' + this.cd + ' ### date - lastcast = ' + (Date.now() - this.lastCast) )
    this.lastCast = Date.now()
    this.onCast()
    
  }

  abstract onCast(): any
}

export class BasicFire extends Skill {
  constructor(fighter: Fighter) {
    super("BasicFire", 200, fighter)
  }

  onCast() {
    let normalizedFiringVector = mousePosition.clone().sub(circleMan.posn).normalize()
    console.log(normalizedFiringVector)
    let bulletMove = cloneObject(moves[this.name])
    bulletMove.direction = normalizedFiringVector
    //bullets.push(currentBullet)
    bulletManager.newBasic(circleMan.posn, bulletMove)
    console.log(bulletMove)
    console.log(circleMan.movement)
    
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

