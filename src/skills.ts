export interface CDInfo {
    cd: number
    timeLeft: number
}

export type SkillName = keyof typeof _skills

//export type SkillName = 'Dash' | 'BasicFire' | 'OrangeFire' | 'Grab'

export const _skills = {
    Dash: {
      cd: 1750,
      timeLeft: 0
    },
    BasicFire: {
      cd: 100,
      timeLeft: 0
    },
    OrangeFire: {
      cd: 5000,
      timeLeft: 0
    },
    Grab: {
      cd: 5000,
      timeLeft: 0
    },
}

export const skills: { [name in SkillName]: SkillName } = _skills



export const isOnCD = (ability: CDInfo): boolean => (ability.timeLeft > 0)

//SkillName = 'basic Fire' | 'orange fire' | 'dash | etc...


//interface Fighter {}
//
//abstract class Skill {
//  lastCast: number
//
//  constructor(public name: string, public cd: number, public fighter: Fighter) {
//    this.name = name
//    this.cd = cd
//    this.lastCast = 0
//  }
//
//  isOnCooldown(): boolean { return this.cd < Date.now() - this.lastCast }
//
//  cast() {
//    this.lastCast = Date.now()
//    this.onCast()
//  }
//
//  abstract onCast()
//}
//
//class Dash extends Skill {
//  constructor(fighter: Fighter) {
//    super("Dash", 1750, fighter)
//  }
//
//  onCast() {
//    // dashing logic
//  }
//}
//
//class CircleMan {
//  dash: Dash = new Dash(this)
//}