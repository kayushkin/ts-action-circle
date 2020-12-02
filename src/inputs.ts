import { Vec2D } from './vecs'

export let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
  shiftLeft: false,
  keyG: false,
}
  
export let mousePosition: Vec2D = {x: 200, y: 200}

window.addEventListener('keydown', evt => {
  window.addEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      keys.up = true
      break
    case 'KeyD':
      keys.down = true
      break
    case 'KeyS':
      keys.left = true
      break
    case 'KeyF':
      keys.right = true
      break
    case 'ShiftLeft':
      keys.shiftLeft = true
      break
    case 'KeyG':
      keys.keyG = true
      break
  }
})
  
  
export const logKey = (e: any) => {
  console.log(e.code)
}
document.addEventListener('keydown', logKey);
  
export const onMouseMove = (evt: MouseEvent) => {
  mousePosition = {x: evt.pageX, y: evt.pageY}
}
  
window.addEventListener('mousedown', evt => {
  keys.fire = true
  mousePosition = {x: evt.pageX, y: evt.pageY}
  window.addEventListener('mousemove', onMouseMove)
})
      
window.addEventListener('mouseup', evt => {
  keys.fire = false
  window.removeEventListener('mousemove', onMouseMove)
})
  
window.addEventListener('keyup', evt => {
  window.removeEventListener('mousemove', onMouseMove)
  switch (evt.code) {
    case 'KeyE':
      keys.up = false
      break
    case 'KeyD':
      keys.down = false
      break
    case 'KeyS':
      keys.left = false
      break
    case 'KeyF':
      keys.right = false
      break
    case 'ShiftLeft':
      keys.shiftLeft = false
      break
    case 'KeyG':
      keys.keyG = false
      break
  }
})