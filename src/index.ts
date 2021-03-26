import { setupCanvas, renderLevel, renderMenu } from './drawings'
import { update } from "./updates"

setupCanvas()

let lastFrame = Date.now()
let inLevel: boolean = true

const loop = () => {
  window.requestAnimationFrame(loop)
  let time = Date.now()
  update(time - lastFrame) // TODO delta
  inLevel ? renderLevel() : renderMenu()
  lastFrame = time
}

loop()
