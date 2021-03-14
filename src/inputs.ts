import { Vec2D } from './vecs'
import { isClickingOnBadGuy } from './detection'
import { BadGuy } from './circles'
import { SkillName } from './skills'

export type Actions = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
} & { [name in SkillName]: boolean}

export let actions: Actions = {
  up: false,
  down: false,
  left: false,
  right: false,
  BasicFire: false,
  OrangeFire: false,
  Dash: false,
  Grab: false,
}
  
export let mousePosition: Vec2D = {x: 200, y: 200}

window.addEventListener('keydown', evt => {
  //console.log(evt.code)
  window.addEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      actions.up = true
      break
    case 'KeyD':
      actions.down = true
      break
    case 'KeyS':
      actions.left = true
      break
    case 'KeyF':
      actions.right = true
      break
    case 'ShiftLeft':
      actions.Dash = true
      break
    case 'KeyG':
      actions.OrangeFire = true
      break
    case 'KeyR':
      actions.Grab = true
    break
  }
})

export const onMouseMove = (evt: MouseEvent) => {
  mousePosition = {x: evt.pageX, y: evt.pageY}
}
  
window.addEventListener('mousedown', evt => {
  actions.BasicFire = true
  mousePosition = {x: evt.pageX, y: evt.pageY}
  window.addEventListener('mousemove', onMouseMove)
})
      
window.addEventListener('mouseup', evt => {
  actions.BasicFire = false
  window.removeEventListener('mousemove', onMouseMove)
})
  
window.addEventListener('keyup', evt => {
  window.removeEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      actions.up = false
      break
    case 'KeyD':
      actions.down = false
      break
    case 'KeyS':
      actions.left = false
      break
    case 'KeyF':
      actions.right = false
      break
    case 'ShiftLeft':
      actions.Dash = false
      break
    case 'KeyG':
      actions.OrangeFire = false
      break
    case 'KeyR':
      actions.Grab = false
    break
  }
})