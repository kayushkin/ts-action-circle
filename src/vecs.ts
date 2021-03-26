export class Vec2D {
  constructor(public x: number, public y: number) {}

  static default(): Vec2D {
    return new Vec2D(0, 0)
  }
  
  magnitude(): number { return Math.sqrt(this.x * this.x + this.y * this.y) }

  normalize() {
    const m = this.magnitude()
    if (m === 0) {
      this.x = 0
      this.y = 0
    } else {
      this.x /= m
      this.y /= m
    }
    return this
  }

  scale(s: number) {
    this.x *= s
    this.y *= s
    return this
  }

  add(v: Vec2D) {
    this.x += v.x
    this.y += v.y
    return this
  }

  sub(v: Vec2D) {
    this.x -= v.x
    this.y -= v.y
    return this
  }

  neg() {
    this.x *= -1
    this.y *= -1
    return this
  }

  clone(): Vec2D {
    return new Vec2D(this.x, this.y)
  }

  distance(v: Vec2D): number {
    return this.clone().sub(v).magnitude()
  }
}