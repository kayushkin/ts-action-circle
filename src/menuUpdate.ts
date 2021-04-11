import { Button, CircleMan } from "./graphics"
import { Vec2D } from "./vecs"
import { Level } from "./levelUpdate"
import { circleMan } from "./levels/1"
import { badGuyManager, bulletManager } from './graphics'
import { buttonImgInfo } from "./drawings"

export let inLevel: boolean = false
export let currentLevel: Level = new Level(
    badGuyManager.badGuys,
    circleMan,
    bulletManager.bullets
)

export class Menu {
    buttons: Button[]
    name: string

    constructor() {
        this.name = 'startMenu'
        this.buttons = []
        this.buttons.push(
            new Button(buttonImgInfo.dungeonOneHL),
            new Button(buttonImgInfo.dungeonOne),
            new Button(buttonImgInfo.dungeonTwoHL),
            new Button(buttonImgInfo.dungeonTwo),
            new Button(buttonImgInfo.dungeonThreeHL),
            new Button(buttonImgInfo.dungeonThree),
            new Button(buttonImgInfo.optionsHL),
            new Button(buttonImgInfo.options),
            new Button(buttonImgInfo.quitGameHL),
            new Button(buttonImgInfo.quitGame),
        )
    }

    highlightHovered() {
        let buttonToHL: number = -1
        this.buttons.forEach((button, idx) => {
            button.isHoveredOver()
            if (!button.buttonInfo.name.includes('HL')) {
                if (button.hoveredOver && button.buttonInfo.canvasPosn.x > 0) {
                     button.buttonInfo.canvasPosn.x -= 2000
                     console.log("REMOVING 2000")
                }
            if (button.buttonInfo.canvasPosn.x < 0){
                if (button.hoveredOver) {
                } else {
                    button.buttonInfo.canvasPosn.x += 2000}
                    console.log("ADDING 2000")
                }
                console.log(button.buttonInfo)

            }
        })
    }

    toggleHL(buttonName: string) {
        this.buttons.forEach((button, idx) => {
            
        })
    }

    setInLevel() {
        this.buttons.forEach(button => {
            if (button.isClickedOn()) {inLevel = true}
        })
    }

}