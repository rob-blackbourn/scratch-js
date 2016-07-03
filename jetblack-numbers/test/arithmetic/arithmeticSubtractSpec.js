describe("Arithmetic subtract", function() {

  it("should subtract two fractions", function() {
    var a = new Fraction(1, 4);
    var b = new Fraction(1, 8);
    var c = Arithmetic.sub(a, b);
    expect(c.numerator).toEqual(1);
    expect(c.denominator).toEqual(8);
  });

  it("should subtract two integers", function() {
    var c = Arithmetic.sub(1, 2);
    expect(c).toEqual(-1);
  });

  it("should subtract two floats", function() {
    var c = Arithmetic.sub(1.5, 2.25);
    expect(c).toEqual(-0.75);
  });

  it("should subtract a fraction from an integer", function() {
    var a = new Fraction(1, 4);
    var c = Arithmetic.sub(a, 1);
    expect(c.numerator).toEqual(-3);
    expect(c.denominator).toEqual(4);
  });

  it("should subtract an integer from a fraction", function() {
    var b = new Fraction(1, 4);
    var c = Arithmetic.sub(1, b);
    expect(c.numerator).toEqual(3);
    expect(c.denominator).toEqual(4);
  });

  it("should subtract a fraction from a float", function() {
    var a = new Fraction(1, 4);
    var c = Arithmetic.sub(a, 1.5);
    expect(c).toEqual(-1.25);
  });

  it("should subtract an float from a fraction", function() {
    var b = new Fraction(1, 4);
    var c = Arithmetic.sub(1.5, b);
    expect(c).toEqual(1.25);
  });

  it("should subtract an integer from a float", function() {
    var c = Arithmetic.sub(1, 1.5);
    expect(c).toEqual(-0.5);
  });

  it("should subtract an float from an integer", function() {
    var b = new Fraction(1, 4);
    var c = Arithmetic.sub(1.5, 1);
    expect(c).toEqual(0.5);
  });

});
