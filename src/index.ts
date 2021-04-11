import { setupCanvas, renderLevel, renderMenu } from './drawings'
import { Level } from "./levelUpdate"
import { inLevel, currentLevel, Menu } from "./menuUpdate"

setupCanvas()

let lastFrame = Date.now()
export let currentMenu: Menu = new Menu()

const loop = () => {
  window.requestAnimationFrame(loop)
  let time = Date.now()
  if (inLevel){
    currentLevel.update(time - lastFrame)
    renderLevel()
  } else {
    currentMenu.setInLevel()
    currentMenu.highlightHovered()
    renderMenu()
  }
  lastFrame = time
}

loop()
