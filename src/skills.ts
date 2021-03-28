import { Fighter, Posn, circleMan, bulletManager, badGuyManager, BadGuy } from './circles'
import { actions, mousePosition } from './inputs'
import { mousedOverBadGuy } from './detection'
import { Move } from './movement'

export type skillName = 'up' | 'down' | 'left' | 'right' | 'BasicFire' | 'OrangeFire' | 'Dash' | 'Grab'

export abstract class Skill {  
  //date last time skill was cast
  lastCast: number

  constructor(public name: skillName, public cd: number, public fighter: Fighter) {
    this.lastCast = 0
  }

  isOffCooldown(): boolean { return this.cd < Date.now() - this.lastCast }

  pressingKey(): boolean { return actions[this.name] }

  isActivating(): boolean { return this.pressingKey() && this.isOffCooldown() && this.activatingCondition() }

  //specific condition for certain skills to activate
  activatingCondition(): boolean { return true }

  cast() {
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
    let bulletMove: Move = new Move('basicFire', 10, 0.5, 10000)
    let normalizedFiringVector = mousePosition.clone().sub(circleMan.posn).normalize()
    bulletMove.direction = normalizedFiringVector
    bulletManager.newBasic(circleMan.posn.clone(), bulletMove)
  }
}
export class OrangeFire extends Skill {
  constructor(fighter: Fighter) {
    super("OrangeFire", 1750, fighter)
  }

  onCast() {
    let orangeBulletMove: Move = new Move('orangeFire', 5, 0.4, 50000)
    let normalizedFiringVector = mousePosition.clone().sub(circleMan.posn.clone()).normalize()
    orangeBulletMove.direction = normalizedFiringVector
    bulletManager.newOrange(circleMan.posn.clone(), orangeBulletMove)
  }
}

export class Dash extends Skill {
  constructor(fighter: Fighter) {
    super("Dash", 1750, fighter)
  }

  onCast() {
    let dash: Move = new Move('dash', 8, 0.5, 250)
    dash.direction = circleMan.movement.direction
    dash.queueMove(circleMan)
  }
}

export class Grab extends Skill {
  constructor(fighter: Fighter) {
    super("Grab", 5000, fighter)
  }

  activatingCondition(): boolean { return !(null == mousedOverBadGuy()) }
  
  onCast() {
    let grab: Move = new Move('grab', 2, 1.75, 5000)
    if (mousedOverBadGuy()) {
      let badGuy = mousedOverBadGuy() as BadGuy  //fix this
      grab.direction = circleMan.posn.clone().sub(badGuy.posn.clone()).normalize()
      grab.queueMove(badGuy)
    }
  }
}

