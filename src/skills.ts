export interface CDinfo {
    cd: number
    timeLeft: number
}

export let circleManSkillCDMap: {[key: string]: CDinfo} = {
    "dash": {
      cd: 800,
      timeLeft: 0
    },
    "basic fire": {
      cd: 300,
      timeLeft: 0
    },
    "orange fire": {
      cd: 1500,
      timeLeft: 0
    }
  }

export const isOnCD = (ability: CDinfo): boolean => {
  if(ability.timeLeft > 0) {
    return true
  }
  return false
}