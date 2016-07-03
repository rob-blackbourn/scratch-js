describe("Arithmetic divide", function() {

  it("should divide two fractions", function() {
    var a = new Fraction(1, 4);
    var b = new Fraction(1, 8);
    var c = Arithmetic.div(a, b);
    expect(c.numerator).toEqual(2);
    expect(c.denominator).toEqual(1);
  });

  it("should divide two integers", function() {
    var c = Arithmetic.div(2, 3);
    expect(c).toEqual(2/3);
  });

  it("should divide two floats", function() {
    var c = Arithmetic.div(1.5, 2.25);
    expect(c).toEqual(1.5/2.25);
  });

  it("should divide a fraction by an integer", function() {
    var a = new Fraction(1, 4);
    var c = Arithmetic.div(a, 2);
    expect(c.numerator).toEqual(1);
    expect(c.denominator).toEqual(8);
  });

  it("should divide an integer by a fraction", function() {
    var b = new Fraction(1, 4);
    var c = Arithmetic.div(2, b);
    expect(c.numerator).toEqual(8);
    expect(c.denominator).toEqual(1);
  });

  it("should divide a fraction by a float", function() {
    var a = new Fraction(1, 4);
    var c = Arithmetic.div(a, 1.5);
    expect(c).toEqual(0.25/1.5);
  });

  it("should divide a float by a fraction", function() {
    var b = new Fraction(1, 4);
    var c = Arithmetic.div(1.5, b);
    expect(c).toEqual(6);
  });

  it("should divide an integer by a float", function() {
    var c = Arithmetic.div(3, 1.5);
    expect(c).toEqual(2);
  });

  it("should divide a float by an integer", function() {
    var c = Arithmetic.mul(1.5, 3);
    expect(c).toEqual(4.5);
  });

});
