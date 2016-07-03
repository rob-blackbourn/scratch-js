describe("Fraction subtract", function() {

  it("should subtract two fractions", function() {
    var a = new Fraction(1, 4);
    var b = new Fraction(1, 2);
    var f = a.sub(b);
    expect(f.numerator).toEqual(-1);
    expect(f.denominator).toEqual(4);
  });

  it("should subtract a fraction from an integer", function() {
    var a = new Fraction(1, 4);
    var f = a.sub(2);
    expect(f.numerator).toEqual(-7);
    expect(f.denominator).toEqual(4);
  });

  it("should subtract a fraction from a float", function() {
    var a = new Fraction(1, 4);
    var f = a.sub(0.5);
    expect(f).toEqual(-0.25);
  });

  it("should subtract a fraction to a string returning NaN", function() {
    var a = new Fraction(1, 4);
    var f = a.sub(" hello");
    expect(Number.isNaN(f)).toBe(true);
  });

  it("should fail to subtract a fraction from NaN", function() {
    var a = new Fraction(1, 4);
    var f = a.sub(Number.NaN);
    expect(Number.isNaN(f)).toBe(true);
  });

});
