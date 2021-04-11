import { Vec2D } from './vecs'

export type Actions = {
  up: boolean,
  down: boolean,
  left: boolean,
  right: boolean,
  BasicFire: boolean,
  OrangeFire: boolean,
  Dash: boolean,
  Grab: boolean,
}

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
  
export let mousePosition: Vec2D = new Vec2D(200, 200)

window.addEventListener('keydown', evt => {
  //console.log(evt.code)
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
  
window.addEventListener('mousedown', evt => {
  actions.BasicFire = true
})


window.addEventListener('mousemove', evt => {
  mousePosition = new Vec2D(evt.pageX, evt.pageY)
})
      
window.addEventListener('mouseup', evt => {
  actions.BasicFire = false
})
  
window.addEventListener('keyup', evt => {
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