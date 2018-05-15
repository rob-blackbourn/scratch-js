/**
 * Creates an instance of a Fraction.
 *
 * @constructor
 * @this {Fraction}
 * @param {number} numerator The numerator of the fraction.
 * @param {number} denominator The denominator of the fraction.
 *
 * @property {number} numerator The numerator of the fraction.
 */
export default class Fraction {
  constructor(numerator, denominator) {
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
      this._numerator = numerator;
      this._denominator = denominator;
      Fraction.simplify(this);
    } else {
      this._numerator = 1;
      this._denominator = 0;
    }
  }

  get numerator() {
    return this._numerator;
  }

  get denominator() {
    return this._denominator;
  }

  static gcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return Fraction.gcd(b, a % b);
    }
  }

  static simplify(fraction) {
    if (fraction._denominator === 0) {
      fraction._numerator = 1;
      fraction._denominator = 0;
    } else if (fraction._numerator === 0) {
      fraction._denominator = 1;
    } else {
      var factor = Fraction.gcd(fraction._numerator, fraction._denominator);
      fraction._numerator /= factor;
      fraction._denominator /= factor;

      if (fraction._denominator < 0) {
        fraction._numerator = -fraction.numerator;
        fraction._denominator = -fraction.denominator;
      }
    }
  }

  static parse(s) {
    let result, numerator, denominator;
    if ((result = /^\s*([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction with whole part
      const whole = Number.parseInt(result[1], 10);
      numerator = Number.parseInt(result[2], 10);
      denominator = Number.parseInt(result[3], 10);
      numerator = whole >= 0 ? numerator + whole * denominator : -(numerator + -whole * denominator);
    } else if ((result = /^\s*([+-]?\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction
      numerator = Number.parseInt(result[1], 10);
      denominator = Number.parseInt(result[2], 10);
    } else if ((result = /^\s*([+-]?\d+)\s*$/.exec(s))) {
      // Whole part only
      numerator = Number.parseInt(result[1], 10);
      denominator = 1;
    }
    else {
      return Fraction.NaN;
    }

    return new Fraction(numerator, denominator);
  }

  static NaN = new Fraction(1, 0);

  toString() {
    if (this.isNaN()) {
      return Number.NaN.toString()
    }

    if (this.numerator == 0) {
      return "0"
    }

    var whole = Math.trunc(this.numerator / this.denominator)
    if (whole) {
      var numerator = whole >= 0 ? this.numerator - whole * this.denominator : -this.numerator + whole * this.denominator
      if (numerator === 0) {
        return whole.toString()
      } else {
        return whole + " " + numerator + "/" + this.denominator
      }
    } else {
      return this.numerator + "/" + this.denominator
    }
  }

  valueOf() {
    return this.isNaN() ? Number.NaN : this._numerator / this._denominator;
  }

  cmp(value) {
    if (value instanceof Fraction) {
      return (this.numerator * value.denominator) - (value.numerator * this.denominator);
    } else if (typeof (value) === 'number') {
      return this.valueOf() - value;
    } else {
      return this - value;
    }
  }

  eq(value) {
    return this.cmp(value) === 0;
  }

  ne(value) {
    return !this.eq(value);
  }

  lt(value) {
    return this.cmp(value) < 0;
  }

  le(value) {
    return this.cmp(value) <= 0;
  }

  gt(value) {
    return this.cmp(value) > 0;
  }

  ge(value) {
    return this.cmp(value) >= 0;
  }

  add(value) {
    if (value instanceof Fraction) {
      return new Fraction((this.numerator * value.denominator) + (value.numerator * this.denominator), this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator + (value * this.denominator), this.denominator);
    } else {
      return this + value;
    }
  }

  sub(value) {
    if (value instanceof Fraction) {
      return new Fraction((this.numerator * value.denominator) - (value.numerator * this.denominator), this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator - (value * this.denominator), this.denominator);
    } else {
      return this - value;
    }
  }

  mul(value) {
    if (value instanceof Fraction) {
      return new Fraction(this.numerator * value.numerator, this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator * value, this.denominator);
    } else {
      return this * value;
    }
  }

  div(value) {
    if (value instanceof Fraction) {
      return new Fraction(this.numerator * value.denominator, this.denominator * value.numerator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator, this.denominator * value);
    } else {
      return this / value;
    }
  }

  abs() {
    if (this._numerator >= 0) {
      return this;
    } else {
      return new Fraction(-this._numerator, this._denominator);
    }
  }

  inv() {
    return new Fraction(this.denominator, this.numerator);
  }

  neg() {
    return new Fraction(-this.numerator, this.denominator);
  }

  sign() {
    return this.numerator >= 0 ? 1 : -1;
  }

  isNaN() {
    return this._denominator === 0;
  }

  static fromFloat(x, tolerance) {

    if (Number.isNaN(x)) {
      return new Fraction(1, 0);
    }

    if (!tolerance)
      tolerance = 1.0E-6;

    var sign = x >= 0 ? 1 : -1;
    x *= sign;

    var h1 = 1,
      h2 = 0,
      k1 = 0,
      k2 = 1;
    var b = x;
    do {
      var a = Math.floor(b);
      var aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);

    return new Fraction(Math.trunc(sign * h1), Math.trunc(k1));
  }

  roundTo(denominators) {
    let min = new Fraction(1, 1), best = new Fraction(1, Math.max.apply(null, denominators)), error = null
    for (let denominator of denominators) {
      const a = this.numerator * denominator;
      const b = a / this.denominator;
      const c = Math.round(b);
      const f = new Fraction(c, denominator);
      error = f.sub(this).abs();
      if (f.numerator !== 0 && error.lt(min)) {
        best = f;
        min = error;
      }
    }
    return best;
  }

  rationalise(epsilon = 0.01) {
    let denominator = 0
    let numerator
    let error

    do {
        denominator++;
        numerator = Math.round((this.numerator * denominator) / this.denominator);
        error = Math.abs(this.sub(numerator / denominator));
    } while (error > epsilon);
    return new Fraction(numerator, denominator);
  }
}