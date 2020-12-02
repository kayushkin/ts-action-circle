import { Circle } from "./circles"
import { magnitude, subtractVec2D } from "./vecs"
import { canvas } from "./drawings"

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