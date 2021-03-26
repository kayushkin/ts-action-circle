import { badGuyManager, Circle } from "./circles"
import { Vec2D } from "./vecs"
import { canvas } from "./drawings"
import { mousePosition } from "./inputs"

export const isCollision = (circle1: Circle, circle2: Circle) => {
  let diff = (circle1.posn.clone().sub(circle2.posn))
  return diff.magnitude() < (circle2.radius + circle1.radius)
}

export const isOob = (circle: Circle) => {
  let x = circle.posn.x
  let y = circle.posn.y
  let distanceToRight = canvas.width + circle.radius
  let distanceToBottom = canvas.height + circle.radius
  return x < -circle.radius || x > distanceToRight || y < -circle.radius || y > distanceToBottom
}

export const mousedOverBadGuy = () => {
  return badGuyManager.badGuys.find(badGuy => {
    let distanceToBadGuy = mousePosition.distance(badGuy.posn)
    return distanceToBadGuy < badGuy.radius
  })
}
