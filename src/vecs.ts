export interface Vec2D {
    x: number
    y: number
  }

export const magnitude = (vec: Vec2D): number => Math.sqrt(vec.x * vec.x + vec.y * vec.y)

export const normalize = (vec: Vec2D): Vec2D => {
    const m = magnitude(vec)
    if (m === 0) return {x: 0, y: 0}
    return {
      x: vec.x / m,
      y: vec.y / m,
    }
}

export const scale = (vec: Vec2D, s: number): Vec2D => ({
  x: vec.x * s,
  y: vec.y * s,
})

export const addVec2D = (vec1: Vec2D, vec2: Vec2D): Vec2D => {
  let xVec = vec1.x + vec2.x
  let yVec = vec1.y + vec2.y
  return {x: xVec, y: yVec}
}

export const subtractVec2D = (vec1: Vec2D, vec2: Vec2D): Vec2D => {
  let xVec = vec1.x - vec2.x
  let yVec = vec1.y - vec2.y
  return {x: xVec, y: yVec}
}

export const reverseVec2D = (vec: Vec2D): Vec2D => {
  return {x: -vec.x, y: -vec.y}
}



