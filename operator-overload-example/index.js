class Point {
  
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  __add__(other) {
    const x = this.x + other.x
    const y = this.y + other.y
    return new Point(x, y)
  }
  
  __eq__(other) {
    return this.x == other.x && this.y == other.y
  }
  
  toString() {
    return `x=${this.x}, y=${this.y}`
  }
}

const p1 = new Point(5, 5)
const p2 = new Point(2, 3)
const p3 = p1 + p2
console.log(p3)

const p4 = new Point(5, 5)
let p5 = new Point(2, 3)
p5 += p4
console.log(p5)

console.log(p3 == p5)