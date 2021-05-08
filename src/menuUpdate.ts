import { Button, CircleMan } from "./graphics"
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
            new Button([buttonImgInfo.dungeonOne, buttonImgInfo.dungeonOneHL]),
            new Button([buttonImgInfo.dungeonTwo, buttonImgInfo.dungeonTwoHL]),
            new Button([buttonImgInfo.dungeonThree, buttonImgInfo.dungeonThreeHL]),
            new Button([buttonImgInfo.options, buttonImgInfo.optionsHL]),
            new Button([buttonImgInfo.quitGame, buttonImgInfo.quitGameHL]),
        )
    }

    highlightHovered() {
        this.buttons.forEach((buttonFrames, idx) => {
            buttonFrames.isHoveredOver()
            buttonFrames.hoveredOver ? buttonFrames.frame = 1 : buttonFrames.frame = 0
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
