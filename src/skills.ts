export interface CDinfo {
    cd: number
    timeLeft: number
}

export let skillsList: {[key: string]: CDinfo} = {
    "dash": {
      cd: 1750,
      timeLeft: 0
    },
    "basic fire": {
      cd: 300,
      timeLeft: 0
    },
    "orange fire": {
      cd: 5000,
      timeLeft: 0
    },
    "grab": {
      cd: 5000,
      timeLeft: 0
    },
  }

export const isOnCD = (ability: CDinfo): boolean => {
  if(ability.timeLeft > 0) {
    return true
  }
  return false
}