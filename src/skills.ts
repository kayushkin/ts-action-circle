export interface CDinfo {
    cd: number
    timeLeft: number
}

export type SkillName = keyof typeof _skills

export const _skills: {[key: string]: CDinfo} = {
    Dash: {
      cd: 1750,
      timeLeft: 0
    },
    BasicFire: {
      cd: 300,
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

export const isOnCD = (ability: CDinfo): boolean => (ability.timeLeft > 0)
