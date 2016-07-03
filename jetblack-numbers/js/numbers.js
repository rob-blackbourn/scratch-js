(function(context) {
  "use strict";

  function Fraction(numerator, denominator) {
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
      if (denominator === 0) {
        this.numerator = 1;
        this.denominator = 0;
      } else if (numerator === 0) {
        this.numerator = 0;
        this.denominator = 1;
      } else {
        var factor = Fraction.gcd(numerator, denominator);
        denominator /= factor;
        if (denominator < 0) {
          this.numerator = -numerator / factor;
          this.denominator = -denominator;
        } else {
          this.numerator = numerator / factor;
          this.denominator = denominator;
        }
      }
    } else {
      this.numerator = 1;
      this.denominator = 0;
    }
  }

  Fraction.gcd = function(a, b) {
    if (b === 0) {
      return a;
    } else {
      return Fraction.gcd(b, a % b);
    }
  };

  Fraction.parse = function(s) {
    var result, numerator, denominator;
    if ((result = /^\s*([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction with whole part
      var whole = parseInt(result[1]);
      numerator = parseInt(result[2]);
      denominator = parseInt(result[3]);
      numerator = whole >= 0 ? numerator + whole * denominator : -(numerator + -whole * denominator);
    } else if ((result = /^\s*([+-]?\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction
      numerator = parseInt(result[1]);
      denominator = parseInt(result[2]);
    } else if ((result = /^\s*([+-]?\d+)\s*$/.exec(s))) {
      // Whole part only
      numerator = parseInt(result[1]);
      denominator = 1;
    }

    return new Fraction(numerator, denominator);
  };

  Fraction.prototype.isNaN = function() {
    return this.denominator === 0;
  };

  Fraction.prototype.toString = function() {

    if (this.isNaN()) {
      return Number.NaN.toString();
    }

    var whole = Math.trunc(this.numerator / this.denominator);
    if (whole) {
      var numerator = whole >= 0 ? this.numerator - whole * this.denominator : -this.numerator + whole * this.denominator;
      if (numerator === 0) {
        return whole.toString();
      } else {
        return whole + " " + numerator + "/" + this.denominator;
      }
    } else {
      return this.numerator + "/" + this.denominator;
    }
  };

  Fraction.prototype.valueOf = function() {
    return this.isNaN() ? Number.NaN : this.numerator / this.denominator;
  };

  Fraction.prototype.cmp = function(value) {
    if (value instanceof Fraction) {
      return (this.numerator * value.denominator) - (value.numerator * this.denominator);
    } else if (typeof(value) === 'number') {
      return this.valueOf() - value;
    } else {
      return this - value;
    }
  };

  Fraction.prototype.eq = function(value) {
    return this.cmp(value) === 0;
  };

  Fraction.prototype.ne = function(value) {
    return !this.eq(value);
  };

  Fraction.prototype.lt = function(value) {
    return this.cmp(value) < 0;
  };

  Fraction.prototype.le = function(value) {
    return this.cmp(value) <= 0;
  };

  Fraction.prototype.gt = function(value) {
    return this.cmp(value) > 0;
  };

  Fraction.prototype.ge = function(value) {
    return this.cmp(value) >= 0;
  };

  Fraction.prototype.add = function(value) {
    if (value instanceof Fraction) {
      return new Fraction((this.numerator * value.denominator) + (value.numerator * this.denominator), this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator + (value * this.denominator), this.denominator);
    } else {
      return this + value;
    }
  };

  Fraction.prototype.sub = function(value) {
    if (value instanceof Fraction) {
      return new Fraction((this.numerator * value.denominator) - (value.numerator * this.denominator), this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator - (value * this.denominator), this.denominator);
    } else {
      return this - value;
    }
  };

  Fraction.prototype.mul = function(value) {
    if (value instanceof Fraction) {
      return new Fraction(this.numerator * value.numerator, this.denominator * value.denominator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator * value, this.denominator);
    } else {
      return this * value;
    }
  };

  Fraction.prototype.div = function(value) {
    if (value instanceof Fraction) {
      return new Fraction(this.numerator * value.denominator, this.denominator * value.numerator);
    } else if (Number.isInteger(value)) {
      return new Fraction(this.numerator, this.denominator * value);
    } else {
      return this / value;
    }
  };

  Fraction.prototype.abs = function() {
    return new Fraction(this.numerator >= 0 ? this.numerator : -this.numerator, this.denominator);
  };

  Fraction.prototype.neg = function() {
    return new Fraction(-this.numerator, this.denominator);
  };

  Fraction.prototype.inv = function() {
    return new Fraction(this.denominator, this.numerator);
  };

  Fraction.prototype.sign = function() {
    return this.numerator >= 0 ? 1 : -1;
  };

  Fraction.fromFloat = function(x, tolerance) {
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
  };

  function Arithmetic() {
  }

  Arithmetic.add = function(a, b) {
    if (a.add) {
      return a.add(b);
    } else if (b.add) {
      return b.add(a);
    } else {
      return a + b;
    }
  };

  Arithmetic.sub = function(a, b) {
    if (a.sub) {
      return a.sub(b);
    } else if (b.add && b.neg) {
      return b.neg().add(a);
    } else {
      return a - b;
    }
  };

  Arithmetic.mul = function(a, b) {
    if (a.mul) {
      return a.mul(b);
    } else if (b.mul) {
      return b.mul(a);
    } else {
      return a * b;
    }
  };

  Arithmetic.div = function(a, b) {
    if (a.div) {
      return a.div(b);
    } else if (b.inv && b.mul) {
      return b.inv().mul(a);
    } else {
      return a / b;
    }
  };

  Arithmetic.abs = function(a) {
    if (a.abs) {
      return a.abs();
    } else {
      return Math.abs(a);
    }
  };

  Arithmetic.neg = function(a) {
    if (a.neg) {
      return a.neg();
    } else {
      return -a;
    }
  };

  Arithmetic.inv = function(a) {
    if (a.inv) {
      return a.inv();
    } else {
      return 1/a;
    }
  };

  Arithmetic.sign = function(a) {
    if (a.sign) {
      return a.sign();
    } else {
      return Math.sign(a);
    }
  };

  function Real(value) {

    var valueType = typeof(value);

    if (valueType === 'number') {
      if (Number.isInteger(value)) {
        this.value = new Fraction(Math.trunc(value), 1);
      } else {
        this.value = value;
      }
    } else if (value instanceof Fraction) {
      if (value.isNaN()) {
        this.value = Number.NaN;
      } else {
        this.value = value;
      }
    } else {
      if (/^\s*[+-]?\d*\.\d+([Ee][+-]?\d+)?\s*$/.test(value)) {
        this.value = parseFloat(value);
      } else {
        this.value = Fraction.parse(value);
        if (this.value.isNaN()) {
          this.value = Number.NaN;
        }
      }
    }
  }

  Real.prototype.toString = function() {
    return this.value.toString();
  };

  Real.prototype.isFloat = function() {
    return typeof(this.value) === 'number';
  };

  Real.prototype.valueOf = function() {
    return this.value.valueOf();
  };

  function areBothRealFractions(lhs, rhs) {
    return lhs instanceof Real && rhs instanceof Real && lhs.value instanceof Fraction && rhs.value instanceof Fraction;
  }

  Real.prototype.eq = function(number) {
    return areBothRealFractions(this, number) ? this.value.eq(number.value) : this.value == number;
  };

  Real.prototype.ne = function(number) {
    return areBothRealFractions(this, number) ? this.value.ne(number.value) : this.value != number;
  };

  Real.prototype.lt = function(number) {
    return areBothRealFractions(this, number) ? this.value.lt(number.value) : this.value < number;
  };

  Real.prototype.le = function(number) {
    return areBothRealFractions(this, number) ? this.value.le(number.value) : this.value <= number;
  };

  Real.prototype.gt = function(number) {
    return areBothRealFractions(this, number) ? this.value.gt(number.value) : this.value > number;
  };

  Real.prototype.ge = function(number) {
    return areBothRealFractions(this, number) ? this.value.ge(number.value) : this.value >= number;
  };

  Real.prototype.add = function(number) {
    return new Real(areBothRealFractions(this, number) ? this.value.add(number.value) : this.value + number);
  };

  Real.prototype.sub = function(number) {
    return new Real(areBothRealFractions(this, number) ? this.value.sub(number.value) : this.value - number);
  };

  Real.prototype.mul = function(number) {
    return new Real(areBothRealFractions(this, number) ? this.value.mul(number.value) : this.value * number);
  };

  Real.prototype.div = function(number) {
    return new Real(areBothRealFractions(this, number) ? this.value.div(number.value) : this.value / number);
  };

  if (typeof define === "function" && define.amd) {
    define({
      Fraction: Fraction,
      Real: Real
    });
  } else if (typeof exports === "object") {
    module.exports = {
      Real: Real,
      Fraction: Fraction,
      Arithmetic: Arithmetic
    };
  } else {
    context.Fraction = Fraction;
    context.Real = Real;
    context.Arithmetic = Arithmetic;
  }

})(this);
