import { Button, CircleMan } from "./graphics"
import { Vec2D } from "./vecs"
import { Level } from "./levelUpdate"
import { circleMan } from "./levels/1"
import { badGuyManager, bulletManager } from './graphics'

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
        this.buttons.push(new Button('DungeonOne', Vec2D.default()))
    }


    setInLevel() {
        this.buttons.forEach(button => {
            button.isClickedOn() ? inLevel = true : inLevel = false
        })
    }

}