import { Move, AutoMove, moves } from "./movement"
import { CDinfo, _skills, SkillName } from "./skills"

export interface Posn {
    x: number
    y: number
}

export interface Id {
  id: number
}

export interface Circle {
    posn: Posn
    radius: number
    color: string
}

export type Bullet = Circle & {
    movement: Move
    name: string
}

export type Fighter = Circle & {
    hp: number
    movement: Move
    spd: number
    skills: {[key: string]: CDinfo}
}

export type BadGuy = Fighter & AutoMove & Id

export type CircleMan = Fighter

export let circleMan: CircleMan = {
    posn: { x: 100, y: 100 },
    radius: 50,
    color: 'blue',
    hp: 5,
    movement: moves.notMoving,
    spd: 0.3,
    skills: _skills
  }
  
export let bullets: Bullet[] = [
  ]
  
export let bullet: Bullet = {
    name: "basic fire",
    posn: {x: circleMan.posn.x, y: circleMan.posn.y },
    radius: 5,
    color: 'red',
    movement: moves.bulletMove
  }
  
export let orangeBullet: Bullet = {
    name: "orange fire",
    posn: {x: circleMan.posn.x, y: circleMan.posn.y },
    radius: 30,
    color: 'orange',
    movement: moves.bulletMove
  }
  
export let greenBadGuy1: BadGuy = {
    id: 1,
    posn: { x: 200, y: 200 }, 
    radius: 50, 
    color: 'green', 
    spd: 0.125, 
    hp: 70, 
    movement: moves.notMoving,
    autoMove: moves.notMoving,
    skills: _skills
  }
export let greenBadGuy2: BadGuy = {
    id: 2,
    posn: { x: 200, y: 400 }, 
    radius: 50, 
    color: 'green', 
    spd: 0.125, 
    hp: 70, 
    movement: moves.notMoving,
    autoMove: moves.notMoving,
    skills: _skills
  }
export let greenBadGuy3: BadGuy = {
    id: 3,
    posn: { x: 400, y: 250 }, 
    radius: 50, 
    color: 'green', 
    spd: 0.125, 
    hp: 70, 
    movement: moves.notMoving,
    autoMove: moves.notMoving,
    skills: _skills
  }
  
export let badGuys: BadGuy[] = [
    greenBadGuy1, greenBadGuy2, greenBadGuy3
  
  ]