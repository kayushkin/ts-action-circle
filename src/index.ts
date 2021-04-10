import { setupCanvas, renderLevel, renderMenu } from './drawings'
import { Level } from "./levelUpdate"

setupCanvas()

let lastFrame = Date.now()
let inLevel: number = 0

//menu choice

const loop = () => {
  window.requestAnimationFrame(loop)
  let time = Date.now()
  update(time - lastFrame) // TODO delta
  (inLevel != 0) ? renderLevel() : renderMenu()
  lastFrame = time
}

loop()
