import { setupCanvas, render } from './drawings'
import { update } from "./updates"

setupCanvas()

let lastFrame = Date.now()

const loop = () => {
  window.requestAnimationFrame(loop)
  let time = Date.now()
  update(time - lastFrame) // TODO delta
  render()
  lastFrame = time
}

loop()
