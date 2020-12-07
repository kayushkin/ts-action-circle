import { badGuys, Circle } from "./circles"
import { magnitude, subtractVec2D } from "./vecs"
import { canvas } from "./drawings"
import { mousePosition } from "./inputs"

export const isCollision = (circle1: Circle, circle2: Circle) => {
    let differenceVec = subtractVec2D(circle1.posn, circle2.posn)
    if (magnitude(differenceVec) < (circle2.radius + circle1.radius)) {
      return true
    } else return false
  }
  
export const isOob = (circle: Circle) => {
  let x = circle.posn.x
  let y = circle.posn.y
  let distanceToRight = canvas.width + circle.radius
  let distanceToBottom = canvas.height + circle.radius
  return x < -circle.radius || x > distanceToRight || y < -circle.radius || y > distanceToBottom
}

export const isClickingOnBadGuy = () => {
  let result = false
  badGuys.forEach(badGuy => {
    let distanceToBadGuy = magnitude(subtractVec2D(mousePosition, badGuy.posn))
    if(distanceToBadGuy < badGuy.radius) {
      badGuyLastClicked = badGuy.id
      result = true
    }
  })
  return result
}

export let badGuyLastClicked = 0